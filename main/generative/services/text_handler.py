from services.config import SummarizeConfig, ChatConfig

class SummaryService:
    def __init__(self, model):
        self.model = model

    def summarize_text(self, text):
        prompt = f"{SummarizeConfig.system_instruction}\n{text}"
        response = self.model.generate_content([prompt])
        return response.text


class ChatService:
    def __init__(self, model):
        self.model = model
        self.history_log = [] 

    def chat(self, context, question):
        prompt = f"{ChatConfig.system_instruction}\nContext: {context}\nQuestion: {question}"
        response = self.model.generate_content([prompt])
        self.history_log.append({"role": "user", "message": question})
        self.history_log.append({"role": "model", "message": response.text.strip()})
        return response.text.strip()

    def add_to_history(self, role, parts):
        self.history_log.append({"role": role, "parts": parts})

    def generate_questions_json(self, content):
        question_prompt = f"Generate questions based on the content below.\n\nContent:\n{content}\n"
        response = self.model.generate_content([question_prompt])
        print(self.history_log)
        return response.text
    
    
