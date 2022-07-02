jQuery(document).ready(function ($) {
    "use strict";

    //Contact
    $('form.php-email-form').submit(function () {

        var f = $(this).find('.form-group'),
            ferror = false,
            emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        f.children('input').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'email':
                        if (!emailExp.test(i.val())) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'checked':
                        if (!i.is(':checked')) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'regexp':
                        exp = new RegExp(exp);
                        if (!exp.test(i.val())) {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        f.children('textarea').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        if (ferror) return false;
        else var str = $(this).serialize();
        var name = $(this)[0].name.value;
        var email = $(this)[0].email.value;
        var subject = $(this)[0].subject.value;
        var textarea = $(this)[0][3].value;
        var this_form = $(this);
        var action = $(this).attr('action');

        if (!action) {
            this_form.find('.loading').slideUp();
            this_form.find('.error-message').slideDown().html('The form action property is not set!');
            return false;
        }

        this_form.find('.sent-message').slideUp();
        this_form.find('.error-message').slideUp();
        this_form.find('.loading').slideDown();
        saveIp(name, email, subject, textarea);
        return true;
    });
    
    //#region Send Message
    function saveIp(name, email, subject, textarea) {
       
        var url = "https://script.google.com/macros/s/AKfycbzj7tjgZoolIDaw7k-X1LG9KVeP21fY7uQJ_XTeAeJSHupiUsHrLgEfFQ9AYH7vJI_L9w/exec";

        const data = { "name": name, "message": textarea, "email": email, "subject": subject };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(data => {
                throw "Success";
            })
            .catch((error) => {
                /*console.error('Error:', error);*/
            });
    }
  //endregion
    
});
