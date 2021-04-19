$(document).ready(() => {
  var firebaseConfig = {
    apiKey: "AIzaSyANByuaeDUXVVc9FxXt522AvKj-sbytUCA",
    authDomain: "dostavymo-b160d.firebaseapp.com",
    databaseURL: "https://dostavymo-b160d.firebaseio.com",
    projectId: "dostavymo-b160d",
    storageBucket: "dostavymo-b160d.appspot.com",
    messagingSenderId: "390587806668",
    appId: "1:390587806668:web:ecce0cfbf6de28c65f2369",
    measurementId: "G-K69HPXF224"
  };
  firebase.initializeApp({
    apiKey: 'AIzaSyANByuaeDUXVVc9FxXt522AvKj-sbytUCA',
    authDomain: 'dostavymo-b160d.firebaseapp.com',
    projectId: 'dostavymo-b160d'
  });
  var db = firebase.firestore();

  $('header .nav li').each((i, e) => {
    $(e).click(() => {
      $('header .nav li').removeClass('active')
      $(e).addClass('active')
    })
  })
  $('.slider').slick({});
  $('.burger').click(() => {
    $('header .nav').toggleClass('active')
  })
  $('header .container .nav li').click(() => {
    $('header .nav').removeClass('active')
  })
  var index = 0;
  db.collection("masters").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      index++
    });
  });
  $('.btn_send').click(() => {
    if ($('#name').val().lenght != '' && $('#phone').val() != '') {

      index++
      console.log($('#name').val(), $('#phone').val(), $('#class').val());
      db.collection("masters").doc((index + 1).toString()).set({
        name: $('#name').val(),
        phone: $('#phone').val(),
        class: $('#class').val(),
      })
      $('#popap').addClass('active');
      $('#f').addClass('active');
      $('#popap h2').text($('#name').val());
      $('#popap .tel').text($('#phone').val());
      $('#popap .class').text($('#name').val());
    } else {
      alert('Заповніть всі поля!')
    }

  })
  $('#registr').click(() => {
    $('#f').addClass('active');
    $('#popap_reg').addClass('active');
  })
  $('#popap_reg .close').click(() => {
    $('#f').removeClass('active');
    $('#popap_reg').removeClass('active');

  })
  $('#popap .close').click(() => {
    console.log('close');
    $('#popap').removeClass('active');
    $('#f').removeClass('active');
  })





  $('.btn_reg').click(() => {
    console.log($('#name_reg').val());
    console.log($('#last_reg').val());
    console.log($('#phone_reg').val());
    console.log($('#email_reg').val());
    console.log($('#pass_reg').val());
    console.log(firebase.auth());
    // firebase.auth().createUserWithEmailAndPassword($('#email_reg').val(), $('#pass_reg').val())
    //   .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     // ...
    //     console.log(user);
    //
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ..
    //     console.log(errorCode,errorMessage);
    //   });
    var sendTo="markjan.teljuk@gmail.com";
    // var sendTo="andriysobenko@outlook.com";

    $.get('https://node.verblike.com/mail', {
      body: [$('#name_reg').val() + ' ' + $('#last_reg').val(), 'Пошта: '+$('#email_reg').val(), 'Номер Телефону: ' + $('#phone_reg').val(), 'Пароль ' + $('#pass_reg').val()],
      to: sendTo
    }, function() {
      // $('.thanks').stop().fadeIn(500);
      $('#popap_reg form').html('<h3>Дякуємо ' + $('#name_reg').val() + ' ' + $('#last_reg').val() +   ' за реєстрацію!</h3> <p>Вашу заявку на зворотній дзвінок буде скоро оброблено</p>' );
    });

  })




  db.collection("masters").onSnapshot((snapshot) => {
    snapshot.docs.forEach((item, i) => {
      console.log(item.data());
      html = `<p>Client №${i+1}
      name: ${item.data().name},
      phone: ${item.data().phone},
      class: ${item.data().class},
      </p>`
      $('#masters').append(html);

    });
  });

})
