from flask import (Blueprint, redirect, 
    render_template, request, g,
    jsonify, session, flash, get_flashed_messages
    )
import uuid
import json
from .models import db, User, Quiz, Option, Group
from datetime import datetime, timedelta
from . import bcrypt 


SESSION_TIMEOUT = timedelta(hours=24)
route_bp = Blueprint('auth', __name__)

ACTIVE_SESSIONS_FILE = 'active_sessions.json'

def load_active_sessions():
    try:
        with open(ACTIVE_SESSIONS_FILE) as file:
            active_sessions_serializable = json.load(file)
            # Convert ISO format strings back to datetime objects
            return {
                user_id: {
                    'email': session_data['email'],
                    'last_activity': session_data['last_activity']
                } for user_id, session_data in active_sessions_serializable.items()
            }
    except FileNotFoundError:
        return {}

# Load active sessions from the JSON file when the application starts

def save_active_sessions(active_sessions):
    with open(ACTIVE_SESSIONS_FILE, 'w') as file:
        json.dump(active_sessions, file)

@route_bp.route('register', methods=['GET', 'POST'])
def create_user():
    if request.method == 'POST':
        data = request.form
        if not data:
            return jsonify({'error': 'No data provided'})
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8') 
    

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'message': 'Username already exists'}), 400
        existing_email = User.query.filter_by(email=email).first()
        if existing_email:
            return jsonify({'message': 'Email already exists'}), 400

        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Sign Up successful'}), 201
    
    return render_template('signup.html', page="signup")

@route_bp.route('/login-user', methods=['GET','POST'])
def login_user_():  
    active_sessions = load_active_sessions()
    args = request.args
    url = args.to_dict()
    messages = get_flashed_messages(with_categories=True)
    if request.method == 'POST':
        data = request.form
        if not data:
            return jsonify({'error': 'No data provided'})
        
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        is_valid = bcrypt.check_password_hash(user.password, password)
        if not user or not is_valid:
            return jsonify({'message': 'Invalid email or password'}), 401
        if user.id in active_sessions.keys():
            print("user.id is in active sessions")
            active_sessions = load_active_sessions()
            last_activity_time = datetime.fromisoformat(active_sessions[user.id]['last_activity'])
            if datetime.utcnow() - last_activity_time > SESSION_TIMEOUT:
                del active_sessions[user.id]
                print(active_sessions)
            else:
                flash('User is already logged in')
                return redirect('/login-user')
    
        active_sessions[user.id] = {'email': user.email, 'last_activity': datetime.utcnow().isoformat()}
        print(active_sessions)
        # db.session.commit()
        save_active_sessions(active_sessions)
        print(url,"here11111111111111111111")
        session["user"] = user
        url_query = url.get('return_url', None)
        print(url_query, "hereeeeeeeeeeeee")
        if url_query is not None:
            return redirect(url_query)
    
        return redirect(f'/groups/{user.id}')
    url_query = url.get('return_url', None)
    print(url_query, "hereeeeeeeeeeeee")
    if url_query is not None:
        return render_template('signup.html', messages=messages, page="login", return_url=url_query)

    return render_template('signup.html', messages=messages, page="login")


@route_bp.route('/groups/remove_user', methods=['POST'])
def remove_user_from_group():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Extract data from JSON
    user_id = data.get('user_id')
    group_id = data.get('group_id')

    # Retrieve the group and check if it exists
    group = Group.query.get(group_id)
    if not group:
        return jsonify({'error': 'Group not found'}), 404

    # Retrieve the user and check if it exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Remove the user from the group
    if user in group.users:
        group.users.remove(user)
        db.session.commit()
        return jsonify({'message': f'User {user_id} removed from group {group_id} successfully'}), 200
    else:
        return jsonify({'error': 'User is not in the group'}), 400
    