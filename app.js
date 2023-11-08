const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');





//  MongoDb bağlantı URL'si
const url='mongodb+srv://root:Me.43940102@cluster0.ejxrkud.mongodb.net/?retryWrites=true&w=majority'

//   MongoDB bağlantısı
mongoose.connect(url,{  useNewUrlParser:true, useUnifiedTopology:true

})
.then(()=>{

  console.log('MongoDB bağlantısı başarılı');
})

.catch((err)=>{

  console.error('MongoDB bağlantı hatası',err)
});

// ŞEMA OLUŞTURMA
const reservationSchema = new mongoose.Schema({

adSoyad:String,
telefon:String,
tarih:String,
saat:String,
kisiSayisi:Number,
notlar:String,
geliş_durumu: {
  type: Boolean,
  default: false
}

},{timestamps:true});

const ReservationRecord = mongoose.model('Reservation_Records',reservationSchema)

//Middleware'ler
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



// Statik dosyaları sunucuya ekleme
app.use(express.static('public'));//statik olan js ve html kodlarını sunucuya eklememizi sağladı

//Ana Sayfa

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html'); //projemiz singlepage olduğu için bu get fonksiyonu işimizi gördü
})

// Veri Tabanına Kaydetme İşlemi

app.post('/kaydet',(req,res)=>{
const adSoyad = req.body.adSoyad;
const telefon = req.body.telefon;
const tarih = req.body.tarih;
const saat = req .body.saat;
const kisiSayisi = req.body.kisiSayisi
const notlar = req.body.notlar;



const yeniKayit = new ReservationRecord({
adSoyad:adSoyad,
telefon:telefon,
tarih:tarih,
saat:saat,
kisiSayisi:kisiSayisi,
notlar:notlar,

})

yeniKayit.save()
.then(()=>{
 
  console.log("Kaydınız Başarılı");
  res.redirect("/"); // Ana sayfaya yönlendir
})
.catch((err)=>{
console.error('Kayıt başarısız',err)
})
 

})



//sunucuyu başlatma
app.listen(3002,()=>{

  console.log('Sunucu başlatıldı 3002 portu')
});
