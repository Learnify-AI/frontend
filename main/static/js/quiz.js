var divs = $('.show-section section');
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first


var count = 60;

var interval = setInterval(function() 
{
  
  if(count == 0)
  {
    clearInterval(interval);
  }
  else 
  {
    count = count -1;
  }
  document.getElementById("countdown-timer").innerHTML = count;
},1000);

$(document).ready(function() {
    var divs = $('.show-section section');
    var now = 0;
    var correctOptions = [];
    var wrongOptions = [];

    function showActiveStep() {
        $('.step-single').removeClass('show');
        $('.step-single').eq(now).addClass('active show');
    }

    function next() {
        divs.eq(now).hide();
        now = (now + 1 < divs.length) ? now + 1 : 0;
        divs.eq(now).show();
        showActiveStep();
    }

    function prev() {
        divs.eq(now).hide();
        now = (now > 0) ? now - 1 : divs.length - 1;
        divs.eq(now).show();
        showActiveStep();
    }

    $(".next").on('click', function() {
        next();
    });

    $(".prev").on('click', function() {
        prev();
    });
    
    function resultFunction() {
        // Perform form validation
        var allRadioInputs = $('input[type="radio"]');
        allRadioInputs.each(function() {
            var checkedRadio = $(this);
            console.log("submit clicked here")
            var optionId = checkedRadio.val();
            var correct = checkedRadio.data('correct');
            if (checkedRadio.prop('checked')) {
                if (correct === "True") {
                    correctOptions.push(optionId);
                } else {
                    wrongOptions.push(optionId);
                }
            }
        });
        var totalQuestions = divs.length;
        var totalCorrect = correctOptions.length;
        var totalScore = (totalCorrect / totalQuestions) * 100;
        $('.u_prcnt').html(totalScore + '%');
        $('.u_result span').html(totalScore + ' Points');
    
        if (totalScore >= 80) {
            $('.pass_check').html('<i class="fa-solid fa-check pass"></i> You Passed!');
            $('.result_msg').html('You passed the test!');
        }
        correctOptions = [];
        wrongOptions = [];
    }
    $(".submit").on('click', resultFunction);

    // $('#resultModal').on('show.bs.modal', function() {
    //     // Calculate total score
    // });

    // Countdown timer logic
    var count = 60;
    var interval = setInterval(function() {
        count = (count > 0) ? count - 1 : 0;
        $("#countdown-timer").text(count);
        if (count == 0) {
            clearInterval(interval);
            // Automatically submit the form when timer reaches 0
            // $("#quizForm").submit();
            // resultFunction()
        }
    }, 1000);
});


// function showresult(yourScore)
// {
//         $('.loadingresult').css('display', 'none');
//         $('.result_page').addClass('result_page_show');
//         $('.u_prcnt').html(yourScore + '%');
//         $('.u_result span').html(yourScore + ' Points');

//         if (yourScore >= 80) {
//             $('.pass_check').html('<i class="fa-solid fa-check"></i> You Passed!');
//             $('.result_msg').html('You passed the test!');
//         }
//         // $('.result_page').addClass('result_page_show');

// }