import {cfg,BR} from "./firebase-config.js";
import {demoDocs} from "./demo.js";
const $=i=>document.getElementById(i),V="https://www.gstatic.com/firebasejs/10.12.2/",ON=cfg.apiKey&&!cfg.apiKey.startsWith("ضع");
const ACI={"ساعات ذكية":"⌚","سماعات رأس":"🎧","سماعات لاسلكية":"🎵","سماعات سلكية":"🎶","شواحن الجوالات":"🔌","كفرات الجوالات":"🛡️"};
let P=[],cart={},q="",X={};
const cl=(u,w)=>u.includes("/upload/")?u.replace("/upload/","/upload/f_auto,q_auto,w_"+w+"/"):u,g=id=>P.find(p=>p.id==id);
const fx=async()=>{const[a,f]=await Promise.all([import(V+"firebase-app.js"),import(V+"firebase-firestore.js")]);return{f,db:f.getFirestore(a.initializeApp(cfg))}};
const money=n=>"₪"+(+n).toLocaleString();
function vis(p){if(p.img)return`<img loading="lazy" decoding="async" src="${cl(p.img,400)}" alt="${p.name}">`;if(p.type=="acc")return`<span class="ic">${p.emoji||"🎧"}</span>`;const c=(p.colors||"#2b4bd0,#050b22").split(",");return`<div class="p" style="background:linear-gradient(160deg,${c[0]},${c[1]})"></div>`}
function card(p){const d=p.old?Math.round((1-p.price/p.old)*100):0,a=p.type=="acc";return`<div class="pd${a?" ac":""}"><div class="pi">${a?"":`<span class="bg">${p.badge||""}</span>`}${d>0?`<span class="ds">-${d}%</span>`:""}${vis(p)}</div><div class="pb">${a?"":`<small>${p.brand}</small>`}<h3>${p.name}</h3>${a?`<span class="tm">⏱ ${p.time||""}</span><span class="sq">${p.specs||""}</span>`:`<span class="sp">${p.type=="used"?"مستعمل · "+(p.cond||"بحالة ممتازة"):"متوفر للاستفسار"}</span>`}<div class="pr"><span><b>${money(p.price)}</b>${p.old?`<s>${money(p.old)}</s>`:""}</span><button onclick="A('${p.id}')">＋</button></div></div></div>`}
function row(k,title,name,L){if(!L.length)return"";const ex=X[k]&&L.length>6;return`<div class="bb"><div class="bh"><h3>${title}</h3>${L.length>6?`<button data-k="${k}">${ex?"عرض أقل ↑":k[0]=="a"?"عرض الكل ←":"عرض كل جوالات "+name+" ←"}</button>`:""}</div><div class="gr${ex?" ex":""}">${(ex?L:L.slice(0,6)).map(card).join("")}</div></div>`}
function R(){const f=p=>((p.name||"")+(p.specs||"")).toLowerCase().includes(q),u=a=>[...new Set(a)];
[["new","gn"],["used","gu"]].forEach(([t,id])=>{$(id).innerHTML=u(P.filter(p=>p.type==t).map(p=>p.brand)).map(b=>row(t+b,b,b,P.filter(p=>p.type==t&&p.brand==b&&f(p)))).join("")||'<p style="color:var(--mut)">لا توجد منتجات حاليًا</p>'});
$("ga").innerHTML=u(P.filter(p=>p.type=="acc").map(p=>p.cat)).map(c=>row("a"+c,(ACI[c]||"🎧")+" "+c,c,P.filter(p=>p.type=="acc"&&p.cat==c&&f(p)))).join("")}
["gn","gu","ga"].forEach(id=>$(id).onclick=e=>{const k=e.target.getAttribute("data-k");if(k){X[k]=!X[k];R()}});
$("q").oninput=function(){q=this.value.toLowerCase();R()};
async function load(){try{P=JSON.parse(localStorage.getItem("bp")||"null")}catch(e){}if(!P||!P.length)P=demoDocs().map((d,i)=>({...d,id:"d"+i}));R();U();if(!ON)return;
try{const{f,db}=await fx(),s=await f.getDocs(f.collection(db,"products")),a=s.docs.map(d=>({...d.data(),id:d.id})).filter(p=>p.stock!==false).sort((x,y)=>(x.order||0)-(y.order||0));if(a.length){P=a;try{localStorage.setItem("bp",JSON.stringify(a))}catch(e){}R();U()}}catch(e){console.warn(e)}}
/* ---- السلة ---- */
try{cart=JSON.parse(localStorage.getItem("bc")||"{}")||{}}catch(e){}
const S=()=>{try{localStorage.setItem("bc",JSON.stringify(cart))}catch(e){}},ids=()=>Object.keys(cart).filter(g),cnt=()=>ids().reduce((s,k)=>s+cart[k],0),tot=()=>ids().reduce((s,k)=>s+cart[k]*g(k).price,0);
const T=t=>{const e=$("ktoast");e.textContent=t;e.className="on";clearTimeout(T.t);T.t=setTimeout(()=>e.className="",1800)};
window.A=id=>{const p=g(id);cart[id]=p.type=="used"?1:(cart[id]||0)+1;S();U();T("تمت الإضافة للسلة ✓")};
window.Qy=(id,d)=>{let v=(cart[id]||0)+d;if(g(id).type=="used"&&v>1)v=1;v<=0?delete cart[id]:cart[id]=v;S();U()};
function U(){$("n").textContent=cnt();if($("ksh").className=="on")RC()}
function RC(){const k=ids(),e=!k.length;$("kdone").style.display="none";
$("kit").innerHTML=e?'<div class="ke"><span>🛒</span><b>سلتك فاضية</b><p>أضف جوالات أو إكسسوارات من المتجر</p></div>':k.map(i=>{const p=g(i),c=(p.colors||"#2b4bd0,#050b22");return`<div class="ki"><span class="kt" style="${p.img||p.type=="acc"?"":"background:linear-gradient(160deg,"+c+")"}">${p.img?`<img src="${cl(p.img,120)}" alt="">`:p.type=="acc"?p.emoji||"🎧":""}</span><div class="kn2"><b>${p.name}</b><small>${p.type=="used"?"مستعمل · قطعة واحدة":p.brand||p.cat}</small><span>${money(p.price*cart[i])}</span></div><div class="kq"><button onclick="Qy('${i}',1)">＋</button><i>${cart[i]}</i><button onclick="Qy('${i}',-1)">−</button></div></div>`}).join("");
$("kform").style.display=e?"none":"block";$("ktot").textContent=money(tot())}
window.K=o=>{$("ksh").className=o?"on":"";$("kov").className=o?"on":"";document.body.style.overflow=o?"hidden":"";if(o)RC()};
window.KE=()=>{if(confirm("تفريغ السلة؟")){cart={};S();U();RC()}};
window.KS=async()=>{const n=$("kname").value.trim(),p=$("kphone").value.replace(/\D/g,""),dl=$("kmeth").value=="توصيل",a=$("kaddr").value.trim(),er=$("kerr"),br=$("kbr").value,nt=$("knote").value.trim();
if(!n)return er.textContent="اكتب اسمك";if(p.length<9)return er.textContent="اكتب رقم جوال صحيح";if(dl&&!a)return er.textContent="اكتب عنوان التوصيل";er.textContent="";
const k=ids(),L=k.map((i,x)=>{const q=g(i);return(x+1)+") "+q.name+(q.type=="used"?" (مستعمل)":"")+" × "+cart[i]+" — "+money(q.price*cart[i])}).join("\n");
const m="🛒 طلب جديد — الباشا فون\n\n👤 الاسم: "+n+"\n📞 الجوال: "+p+"\n📍 الفرع: "+br+"\n🚚 الاستلام: "+$("kmeth").value+(dl?" — "+a:"")+"\n\n"+L+"\n\n💰 الإجمالي: "+money(tot())+(nt?"\n📝 ملاحظات: "+nt:"");
const o={name:n,phone:p,branch:br,method:$("kmeth").value,addr:a,note:nt,total:tot(),items:k.map(i=>({id:i,name:g(i).name,qty:cart[i],price:+g(i).price}))};
window.open("https://wa.me/"+BR[br]+"?text="+encodeURIComponent(m),"_blank");
if(ON)try{const{f,db}=await fx();await f.addDoc(f.collection(db,"orders"),{...o,status:"جديد",at:f.serverTimestamp()})}catch(e){}
cart={};S();U();$("kit").innerHTML="";$("kform").style.display="none";$("kdone").style.display="block"};
$("cart").onclick=()=>K(1);
setInterval(()=>{const n=new Date,e=new Date(n);e.setHours(23,59,59,0);const s=Math.floor((e-n)/1e3),z=x=>String(x).padStart(2,"0");$("hh").textContent=z(Math.floor(s/3600));$("mm").textContent=z(Math.floor(s%3600/60));$("ss").textContent=z(s%60)},1e3);
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
load();
