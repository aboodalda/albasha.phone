import {cfg,BR} from "./firebase-config.js";
import {demoDocs} from "./demo.js";
const $=i=>document.getElementById(i),V="https://www.gstatic.com/firebasejs/10.12.2/",ON=cfg.apiKey&&!cfg.apiKey.startsWith("ضع");
const ACI={"ساعات ذكية":"⌚","سماعات رأس":"🎧","سماعات لاسلكية":"🎵","سماعات سلكية":"🎶","شواحن الجوالات":"🔌","كفرات الجوالات":"🛡️"};
let P=[],cart={},q="",X={};
const cl=(u,w)=>u.includes("/upload/")?u.replace("/upload/","/upload/f_auto,q_auto,w_"+w+"/"):u,g=id=>P.find(p=>p.id==id);
const fx=async()=>{const[a,f]=await Promise.all([import(V+"firebase-app.js"),import(V+"firebase-firestore.js")]);return{f,db:f.getFirestore(a.initializeApp(cfg))}};
const money=n=>"₪"+(+n).toLocaleString();
function vis(p){if(p.img)return`<img loading="lazy" decoding="async" onload="this.classList.add('ok')" onerror="this.classList.add('ok')" src="${E(cl(p.img,400))}" alt="${E(p.name)}">`;if(p.type=="acc")return`<span class="ic">${p.emoji||"🎧"}</span>`;const c=(p.colors||"#2b4bd0,#050b22").split(",");return`<div class="p" style="background:linear-gradient(160deg,${c[0]},${c[1]})"></div>`}
function card(p,i){const d=p.old?Math.round((1-p.price/p.old)*100):0,a=p.type=="acc";return`<div class="pd rv${a?" ac":""}" style="--d:${Math.min(i||0,5)*.06}s"><div class="pi${p.img?" im":""}">${a?"":`<span class="bg">${E(p.badge)}</span>`}${d>0?`<span class="ds">-${d}%</span>`:""}${vis(p)}</div><div class="pb">${a?"":`<small>${E(p.brand)}</small>`}<h3>${E(p.name)}</h3>${a?`<span class="tm">⏱ ${E(p.time)}</span><span class="sq">${E(p.specs)}</span>`:`<span class="sp">${p.type=="used"?"مستعمل · "+E(p.cond||"بحالة ممتازة"):"متوفر للاستفسار"}</span>`}<div class="pr"><span><b>${money(p.price)}</b>${p.old?`<s>${money(p.old)}</s>`:""}</span><button onclick="A('${p.id}')">＋</button></div></div></div>`}
function row(k,title,name,L){if(!L.length)return"";const ex=X[k]&&L.length>6;return`<div class="bb"><div class="bh"><h3>${title}</h3>${L.length>6?`<button data-k="${k}">${ex?"عرض أقل ↑":k[0]=="a"?"عرض الكل ←":"عرض كل جوالات "+name+" ←"}</button>`:""}</div><div class="gr${ex?" ex":""}">${(ex?L:L.slice(0,6)).map(card).join("")}</div></div>`}
function R(){setTimeout(RV,0);const f=p=>((p.name||"")+(p.specs||"")).toLowerCase().includes(q),u=a=>[...new Set(a)];
[["new","gn"],["used","gu"]].forEach(([t,id])=>{$(id).innerHTML=u(P.filter(p=>p.type==t).map(p=>p.brand)).map(b=>row(t+b,b,b,P.filter(p=>p.type==t&&p.brand==b&&f(p)))).join("")||'<p style="color:var(--mut)">لا توجد منتجات حاليًا</p>'});
$("ga").innerHTML=u(P.filter(p=>p.type=="acc").map(p=>p.cat)).map(c=>row("a"+c,(ACI[c]||"🎧")+" "+c,c,P.filter(p=>p.type=="acc"&&p.cat==c&&f(p)))).join("")}
["gn","gu","ga"].forEach(id=>$(id).onclick=e=>{const k=e.target.getAttribute("data-k");if(k){X[k]=!X[k];R()}});
$("q").oninput=function(){q=this.value.toLowerCase();R()};
async function load(){try{P=JSON.parse(localStorage.getItem("bp")||"null")}catch(e){}if(!P||!P.length)P=demoDocs().map((d,i)=>({...d,id:"d"+i}));R();U();if(!ON)return;
try{const{f,db}=await fx(),s=await f.getDocs(f.collection(db,"products")),a=s.docs.map(d=>({...d.data(),id:d.id})).filter(p=>p.stock!==false).sort((x,y)=>(x.order||0)-(y.order||0));if(a.length){P=a;try{localStorage.setItem("bp",JSON.stringify(a))}catch(e){}R();U()}
try{const bs=await f.getDoc(f.doc(db,"settings","branches"));if(bs.exists()&&bs.data().list){BRS=bs.data().list;try{localStorage.setItem("bb",JSON.stringify(BRS))}catch(e){}RB()}}catch(e){}
try{const bn=await f.getDoc(f.doc(db,"settings","banner"));if(bn.exists()){BNR=bn.data();try{localStorage.setItem("bn",JSON.stringify(BNR))}catch(e){}RN()}}catch(e){}
try{if(!sessionStorage.getItem("bv")){sessionStorage.setItem("bv","1");const n=new Date(),d=new Date(n-n.getTimezoneOffset()*6e4).toISOString().slice(0,10),r=f.doc(db,"visits",d);try{await f.updateDoc(r,{n:f.increment(1)})}catch(e){await f.setDoc(r,{n:1})}}}catch(e){}
}catch(e){console.warn(e)}}
/* ---- السلة ---- */
try{cart=JSON.parse(localStorage.getItem("bc")||"{}")||{}}catch(e){}
const S=()=>{try{localStorage.setItem("bc",JSON.stringify(cart))}catch(e){}},ids=()=>Object.keys(cart).filter(g),cnt=()=>ids().reduce((s,k)=>s+cart[k],0),tot=()=>ids().reduce((s,k)=>s+cart[k]*g(k).price,0);
const T=t=>{const e=$("ktoast");e.textContent=t;e.className="on";clearTimeout(T.t);T.t=setTimeout(()=>e.className="",1800)};
window.A=id=>{const p=g(id),ct=$("cart");ct.classList.remove("bump");void ct.offsetWidth;ct.classList.add("bump");cart[id]=p.type=="used"?1:(cart[id]||0)+1;S();U();T("تمت الإضافة للسلة ✓")};
window.Qy=(id,d)=>{let v=(cart[id]||0)+d;if(g(id).type=="used"&&v>1)v=1;v<=0?delete cart[id]:cart[id]=v;S();U()};
function U(){$("n").textContent=cnt();if($("ksh").className=="on")RC()}
function RC(){const k=ids(),e=!k.length;$("kdone").style.display="none";
$("kit").innerHTML=e?'<div class="ke"><span>🛒</span><b>سلتك فاضية</b><p>أضف جوالات أو إكسسوارات من المتجر</p></div>':k.map(i=>{const p=g(i),c=(p.colors||"#2b4bd0,#050b22");return`<div class="ki"><span class="kt" style="${p.img||p.type=="acc"?"":"background:linear-gradient(160deg,"+c+")"}">${p.img?`<img src="${E(cl(p.img,120))}" alt="">`:p.type=="acc"?p.emoji||"🎧":""}</span><div class="kn2"><b>${E(p.name)}</b><small>${p.type=="used"?"مستعمل · قطعة واحدة":E(p.brand||p.cat)}</small><span>${money(p.price*cart[i])}</span></div><div class="kq"><button onclick="Qy('${i}',1)">＋</button><i>${cart[i]}</i><button onclick="Qy('${i}',-1)">−</button></div></div>`}).join("");
$("kform").style.display=e?"none":"block";$("ktot").textContent=money(tot())}
window.K=o=>{$("bsh").className="";$("rsh").className="";$("ksh").className=o?"on":"";$("kov").className=o?"on":"";document.body.style.overflow=o?"hidden":"";if(o)RC()};
window.KE=()=>{if(confirm("تفريغ السلة؟")){cart={};S();U();RC()}};
window.KS=async()=>{const n=$("kname").value.trim(),p=$("kphone").value.replace(/\D/g,""),dl=$("kmeth").value=="توصيل",a=$("kaddr").value.trim(),er=$("kerr"),br=$("kbr").value,nt=$("knote").value.trim();
if(!n)return er.textContent="اكتب اسمك";if(p.length<9)return er.textContent="اكتب رقم جوال صحيح";if(dl&&!a)return er.textContent="اكتب عنوان التوصيل";er.textContent="";
const k=ids(),L=k.map((i,x)=>{const q=g(i);return(x+1)+") "+q.name+(q.type=="used"?" (مستعمل)":"")+" × "+cart[i]+" — "+money(q.price*cart[i])}).join("\n");
const m="🛒 طلب جديد — الباشا فون\n\n👤 الاسم: "+n+"\n📞 الجوال: "+p+"\n📍 الفرع: "+br+"\n🚚 الاستلام: "+$("kmeth").value+(dl?" — "+a:"")+"\n\n"+L+"\n\n💰 الإجمالي: "+money(tot())+(nt?"\n📝 ملاحظات: "+nt:"");
const o={name:n,phone:p,branch:br,method:$("kmeth").value,addr:a,note:nt,total:tot(),items:k.map(i=>({id:i,name:g(i).name,qty:cart[i],price:+g(i).price}))};
window.open("https://wa.me/"+wa(BRS.find(b=>b.name==br)||BRS[0])+"?text="+encodeURIComponent(m),"_blank");
if(ON)try{const{f,db}=await fx();await f.addDoc(f.collection(db,"orders"),{...o,status:"جديد",at:f.serverTimestamp()})}catch(e){}
cart={};S();U();$("kit").innerHTML="";$("kform").style.display="none";$("kdone").style.display="block"};
$("cart").onclick=()=>K(1);
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
const DB=Object.keys(BR).map(n=>({name:n,addr:n=="خانيونس"?"وسط شارع جلال":"",phone:"0592936150",hours:"",map:"",active:true}));
let BRS=DB;try{BRS=JSON.parse(localStorage.getItem("bb"))||DB}catch(e){}
const wa=b=>"970"+String(b.phone).replace(/\D/g,"").replace(/^0/,"");
function RB(){const L=BRS.filter(b=>b.active!==false);$("gb").innerHTML=L.map((b,i)=>`<div class="bx">${i==0?'<span class="m">الفرع الرئيسي</span>':""}<em>📍</em><h3>فرع ${b.name}</h3><p>${b.addr||"للعنوان تواصل معنا عبر واتساب"}${b.hours?"<br>🕒 "+b.hours:""}</p><div class="r"><a href="tel:${b.phone}">📞 اتصل</a><a href="https://wa.me/${wa(b)}" target="_blank" rel="noopener">💬 واتساب</a>${b.map?`<a class="mp" href="${b.map}" target="_blank" rel="noopener">🗺️ الخريطة</a>`:""}</div></div>`).join("");const o=L.map(b=>`<option>${b.name}</option>`).join("");$("kbr").innerHTML=o;$("rbr").innerHTML=o}
window.RP=o=>{$("ksh").className="";$("rsh").className=o?"on":"";$("kov").className=o?"on":"";document.body.style.overflow=o?"hidden":"";if(o){$("rform").style.display="block";$("rdone").style.display="none"}};
window.RS=async()=>{const n=$("rname").value.trim(),p=$("rphone").value.replace(/\D/g,""),d=$("rdev").value.trim(),i=$("risu").value.trim(),br=$("rbr").value,er=$("rerr");if(!n)return er.textContent="اكتب اسمك";if(p.length<9)return er.textContent="اكتب رقم جوال صحيح";if(!d)return er.textContent="اكتب نوع الجهاز";er.textContent="";
const m="🔧 طلب صيانة — الباشا فون\n\n👤 الاسم: "+n+"\n📞 الجوال: "+p+"\n📍 الفرع: "+br+"\n📱 الجهاز: "+d+(i?"\n⚠️ المشكلة: "+i:"");
window.open("https://wa.me/"+wa(BRS.find(b=>b.name==br)||BRS[0])+"?text="+encodeURIComponent(m),"_blank");
if(ON)try{const{f,db}=await fx();await f.addDoc(f.collection(db,"repairs"),{name:n,phone:p,branch:br,device:d,issue:i,status:"جديد",at:f.serverTimestamp()})}catch(e){}
$("rform").style.display="none";$("rdone").style.display="block"};
const DN={active:true,tag:"الجديد وصل",title:"أحدث الجوالات\nبأفضل الأسعار",text:"جوالات جديدة متوفرة الآن — اطلب عبر واتساب واستلم بسرعة.",btn:"تسوّق الآن ←",msg:""};
let BNR=DN;try{BNR=JSON.parse(localStorage.getItem("bn"))||DN}catch(e){}
const E=s=>String(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function RN(){const b=BNR;$("hbn").style.display=b.active===false?"none":"";$("bt").textContent=b.tag||"";$("bh").innerHTML=E(b.title).replace(/\n/g,"<br>");$("bp").textContent=b.text||"";$("bb").textContent=b.btn||"تسوّق الآن ←"}
window.BN=()=>{const L=BRS.filter(b=>b.active!==false);if(L.length==1)return BW(0);$("ksh").className="";$("rsh").className="";$("bsh").className="on";$("kov").className="on";document.body.style.overflow="hidden";$("bl").innerHTML=L.map((b,i)=>`<button class="ks" onclick="BW(${i})">💬 فرع ${E(b.name)}${b.addr?" — "+E(b.addr):""}</button>`).join("")};
window.BW=i=>{const b=BRS.filter(x=>x.active!==false)[i],t=BNR.msg||"مرحبًا الباشا فون 👋\nبدي أستفسر عن: "+String(BNR.title||"").replace(/\n/g," ");window.open("https://wa.me/"+wa(b)+"?text="+encodeURIComponent(t),"_blank");K(0)};
const IO="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");IO.unobserve(e.target)}}),{threshold:.08,rootMargin:"0px 0px -4% 0px"}):null;
function RV(){document.querySelectorAll(".hb,.cats a,.sh,.rc,.rb,.bx,.tr div,.br div").forEach((e,i)=>{if(!e.classList.contains("rv")){e.classList.add("rv");e.style.setProperty("--d",(i%4)*.07+"s")}});document.querySelectorAll(".rv:not([data-o])").forEach(e=>{e.setAttribute("data-o","1");IO?IO.observe(e):e.classList.add("in")})}
const NA=[...document.querySelectorAll(".nv a")],SEC=NA.map(x=>document.querySelector(x.getAttribute("href")));
function SP(){const h=document.querySelector("header").offsetHeight;document.documentElement.style.scrollPaddingTop=(h+6)+"px";let k=-1;SEC.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<=h+70)k=i});NA.forEach((x,i)=>x.classList.toggle("on",i==k));if(k>=0&&NA[k]!==SP.l){SP.l=NA[k];NA[k].scrollIntoView&&NA[k].scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}else if(k<0)SP.l=null}
addEventListener("scroll",()=>requestAnimationFrame(SP),{passive:true});addEventListener("resize",SP);
RB();RN();load();RV();SP();
