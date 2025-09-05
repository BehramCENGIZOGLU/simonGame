// level adlı değişken tanımlandı.
var level = 1;
// userClickedPattern adında boş  bir dizi oluşturuldu.
var userClickedPattern = [];
// gamePattern adında boş bir dizi oluşturuldu.
var gamePattern = [];

// buttonColours adında bir dizi oluşturuldu ve elemanları yazıldı.
var buttonColours = ["red","blue","green","yellow"];

// Başlangıçta oyun başlamamış olarak ayarlandı.
var started = false; 

// jQuery ile sayfada bir tuşa basılma olayı ile oyunun başlaması yapıldı.
// Böylece sayfa aktif edilip sesin çalışması sağlanacaktır.
$(document).keypress(function() {
    nextSequence();
});

// herhangi bir butona tıklandığı zaman algılanması için jQuery kullanıldı.
$(".btn").click(function(event){

    // userChosenColour adlı değişkene tıklanan butonun id si atandı.
    var userChosenColour = event.target.id;

    // userChosenColour değişkeninin içeriğini userClickedPattern'in sonuna eklendi.
    userClickedPattern.push(userChosenColour);

    // kullanıcı butona tıkladığında ses çalması işlemi yapıldı.
    playSound(userChosenColour);

    // tıklanan butona animatePress fonksiyonu içerisinde ki pressed sınıfı eklenecektir.
    animatePress(userChosenColour);

    // jQuery ile 100 milisaniye sonra eklenen sınıfın kaldırılması için setTimeout kullanıldı.
    setTimeout(function(){
    $("#" + userChosenColour).removeClass('pressed');
    }, 100);

    // kullanıcının son tıkladığı butonun indexi checkAnswer'a iletildi.
    checkAnswer(userClickedPattern.length -1);

});

// nextSequence adında bir fonksiyon oluşturuldu.
function nextSequence(){

    userClickedPattern=[];

    // jQuery ile fonksiyon çağırıldığı anda başlık değiştirilmesi işlemi ve her çağırılışta seviye arttırılması uygulandı.
    $("#level-title").text("level " + level);
    level++;

    // 0-3 arası rastgele bir sayı üretildi ve randomNumber'a atandı.
    var randomNumber = Math.floor(Math.random()*4);

    // randomChosenColour adında bir değişken oluşturuldu.
    // randomNumber kullanılarak buttonColours'tan rastgele bir renk seçildi.
    var randomChosenColour = buttonColours[randomNumber];

    // gamePattern dizisinin sonuna randomChosenColour'dan gelen değer eklendi.
    gamePattern.push(randomChosenColour);

    // randomChosenColour ile aynı id'ye sahip bir düğme seçilmesi için jQuery kullanıldı.
    // jQuery ile seçilen butona flash animasyonu eklendi.
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // seçilen düğme renginin sesi playSound fonksiyonu ile çalındı.
    playSound(randomChosenColour);

}

// playSound adında name girdisi alan bir fonksiyon oluşturuldu.
// rastgele seçilen butonun sesi çalındı.
// kullanıcının seçtiği butonun seni çalındı.
function playSound(name){
    
    // seçilen düğme renginin sesi Javascript ile çalındı.
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// animatePress adında currentColour girdisi alan bir fonksiyon oluşturuldu.
function animatePress(currentColour){
    // id si girilen butona jQuery ile css dosyasında ki pressed adında sınıf eklenecektir.
    $("#" + currentColour).addClass("pressed");
}

// checkAnswer adında currentLevel girdisi alan bir fonksiyon oluşturuldu.
function checkAnswer(currentLevel){

    // kullanıcının son bastığı butonun indexi ile bilgisayarın son seçtiği butonun indexi aynı mı kontrol edildi.
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success.");
        // kullanıcının seçtiği butonların uzunluğu ve bilgisayarın seçtiği butonların uzunluğu kontrol edildi.
        if(userClickedPattern.length === gamePattern.length){
            // uzunlukların aynı olması durumunda 1000 milisaniyelik gecikme ile nextSequence çağırıldı.
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        // yanlış butona basılması durumunda hata sesi çalındı.
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        console.log("wrong");
        // hatalı basım olduğu anda jQuery ile body kısmına css dosyasında ki game-over css i eklendi
        $(document.body).addClass("game-over");
        
        // jQuery ile game-over css i 200 milisaniye sonra kaldırıldı.
        setTimeout(function(){
            $(document.body).removeClass("game-over");
        }, 200);

        // tekrar başlatılması için jQuery ile başlık kısmı değiştirildi.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        // yanlış basım sonrası startOver fonksiyonu çağırıldı.
        startOver();
    }
   
}

// startOver adında yeni bir fonksiyon oluşturuldu.
// level, gamePattern, userClickedPattern sıfırlandı.
// böylece oyun tekrar başlatılacak.
function startOver(){
    level = 1;
    gamePattern=[];
    userClickedPattern=[];
}