import{a as h}from"./axios-L6U4YIEh.js";import{_ as x,r as m,o as f,a as b,b as l,c,d as t,e as _,w as u,F as y,f as g,g as w,t as a,h as v}from"./index-6u56en5u.js";const k={setup(){let n=m([]);f(()=>{o()});function o(){h.get("http://localhost:3000/api/positions").then(e=>{n.value=e.data.data}).catch(e=>{console.log(e.response.data)})}function r(e){h.delete(`http://localhost:3000/api/positions/delete/${e}`).then(()=>{o()}).catch(i=>{console.log(i.response.data),alert(i.response.data.message)})}return{positions:n,fetchPositions:o,positionDelete:r}}},N={class:"w-full h-screen px-10 py-5 bg-gray-100"},C=t("p",{class:"mb-4 text-3xl font-bold"},"Posisi",-1),$={class:"py-4"},B=t("i",{class:"material-icons me-2"},"add",-1),D={class:"relative max-h-full overflow-y-auto drop-shadow-md"},P={class:"w-full text-left max-h-60"},V=t("thead",{class:"sticky top-0 text-white uppercase bg-gray-800 border-b"},[t("tr",null,[t("th",{scope:"col",class:"px-6 py-3"},"No"),t("th",{scope:"col",class:"px-6 py-3"},"Id"),t("th",{scope:"col",class:"px-6 py-3"},"Nama"),t("th",{scope:"col",class:"px-6 py-3"},"Gaji"),t("th",{scope:"col",class:"px-6 py-3"},"Actions")])],-1),F={class:"px-6 py-3"},I={class:"px-6 py-3"},M={class:"px-6 py-3"},T={class:"px-6 py-3"},j={class:"px-6 py-3"},A=t("i",{class:"material-icons"},"edit",-1),E=["onClick"],G=t("i",{class:"material-icons"},"delete",-1),L=[G];function S(n,o,r,e,i,q){const d=b("router-link");return l(),c("div",N,[C,t("div",$,[_(d,{to:{name:"positions.create"},type:"button",class:"inline-flex items-center px-3 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"},{default:u(()=>[B,w(" Tambah Posisi ")]),_:1},8,["to"])]),t("div",D,[t("table",P,[V,t("tbody",null,[(l(!0),c(y,null,g(e.positions,(s,p)=>(l(),c("tr",{key:p,class:"text-lg bg-white border-b"},[t("td",F,a(p+1),1),t("td",I,a(s.position_id),1),t("td",M,a(s.position_name),1),t("td",T,a(s.salary),1),t("td",j,[_(d,{to:{name:"positions.edit",params:{id:s.position_id}},type:"button",class:"inline-flex items-center p-2 text-sm font-medium text-center text-yellow-500 border border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white me-2"},{default:u(()=>[A]),_:2},1032,["to"]),t("button",{class:"inline-flex items-center p-2 text-sm font-medium text-center text-red-500 border border-red-500 rounded-lg me-2 hover:bg-red-500 hover:text-white",type:"button",onClick:v(z=>e.positionDelete(s.position_id),["prevent"])},L,8,E)])]))),128))])])])])}const K=x(k,[["render",S]]);export{K as default};
