(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[0],{48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(22),a=n.n(r),i=n(1),s=n.n(i),c=n(2),l=n.n(c),u=n(5),d=n(3),g=n(23),f=n(6);f.FunctionFactory.Instance.register("hasEnoughTimePassed",(function(e){if(e[1]){var t=e[0],n=new Date(e[1]),o=n.getFullYear()+t;return n.setFullYear(o)<Date.now()?"Yes":"No"}})),f.FunctionFactory.Instance.register("chargeEligibility",(function(e){return{"Class 1 Felony":"Ineligible","Class 2 Felony":"Ineligible","Class 3 Felony":"Ineligible","Class 1 Drug Felony":"Ineligible","Felony Sex offense":"Ineligible","Felony Drug Special Offense":"Ineligible","Felony Child abuse":"Ineligible","Felony Domestic violence":"Ineligible","Felony Murder or manslaughter":"Ineligible","Felony Vehicular homicide or assault":"Ineligible","Felony Menacing":"Ineligible","Felony First or Second Degree Kidnapping":"Ineligible","Felony Robbery":"Ineligible","Felony First or Second Degree Burglary of a Dwelling":"Ineligible","Felony Retaliating or Intimidating a Witness or Victim":"Ineligible","Misdemeanor traffic offense":"Ineligible","DUI or DWAI":"Ineligible","Petty offense":1,"Petty drug offense":1,"Class 2 Misdemeanor":2,"Class 3 Misdemeanor":2,"Drug misdemeanor offense":2,"Class 4 Felony":3,"Class 5 Felony":3,"Class 6 Felony":3,"Class 3 Drug Felony":3,"Class 4 Drug Felony":3,"Class 1 Misdemeanor":3,"Municipal offense":3,"Class 2 Drug Felony":5,"Don't Know/Not Sure":"Not Sure"}[e[0]]}));var m={title:"Tell us some more about your case.",clearInvisibleValues:"onHidden",triggers:[{type:"setvalue",expression:"{coloradoArrest} = 'No' or {over18} = 'No' or {federalCase} = 'Yes' or chargeEligibility({chargeToSeal}) = 'Ineligible' or {completedSentencing} = 'No' or hasEnoughTimePassed(chargeEligibility({chargeToSeal}), {enoughTimePassed}) = 'No' or {paidRestitutionAndFees} = 'No' or {attemptedToSeal} = 'Yes'",setToName:"outcome",setValue:"ineligible"},{type:"setvalue",expression:"{sealingArrestRecordOnly} = 'Yes' or {chargeDismissedOrAcquitted} = 'Yes' or {anyNewOffense} = 'No'",setToName:"outcome",setValue:"eligible"},{type:"setvalue",expression:"{federalCase} = 'Not Sure' or {chargeToSeal} = 'Not Sure' or {completedSentencing} = 'Not Sure' or {chargeDismissedOrAcquitted} = 'Not Sure' or {paidRestitutionAndFees} = 'Not Sure' or {attemptedToSeal} = 'Not Sure' or {anyNewOffense} = 'Yes' or {anyNewOffense} = 'Not Sure'",setToName:"outcome",setValue:"needInfo"}],pages:[{name:"preliminaryQuestions",questions:[{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"coloradoArrest",title:"Did your arrest or charge take place in Colorado?"},{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"over18",title:"Were you over 18 at the time of the arrest or charge?",visibleIf:"{coloradoArrest} = 'Yes'"},{type:"radiogroup",choices:["Yes","No","Not Sure"],isRequired:!0,name:"federalCase",title:"Was your case a federal case?",visibleIf:"{over18} = 'Yes'"}]},{name:"sealingArrestsAndCharges",visibleIf:"{federalCase} = 'No'",questions:[{type:"radiogroup",choices:["Yes","No"],isRequired:!0,name:"sealingArrestRecordOnly",title:"Were you arrested, but not charged & seeking to seal arrest record only?"},{type:"radiogroup",choices:["Yes","No","Not Sure"],isRequired:!0,name:"chargeDismissedOrAcquitted",title:"Were all charges in your case dismissed or were you acquitted (found not guilty)?",visibleIf:"{sealingArrestRecordOnly} = 'No'"},{type:"dropdown",choices:["Class 1 Felony","Class 2 Felony","Class 3 Felony","Class 1 Drug Felony","Felony Sex offense","Felony Drug Special Offense","Felony Child abuse","Felony Domestic violence","Felony Murder or manslaughter","Felony Vehicular homicide or assault","Felony Menacing","Felony First or Second Degree Kidnapping","Felony Robbery","Felony First or Second Degree Burglary of a Dwelling","Felony Retaliating or Intimidating a Witness or Victim","Misdemeanor traffic offense","DUI or DWAI","Petty offense","Petty drug offense","Class 2 Misdemeanor","Class 3 Misdemeanor","Drug misdemeanor offense","Class 4 Felony","Class 5 Felony","Class 6 Felony","Class 3 Drug Felony","Class 4 Drug Felony","Class 1 Misdemeanor","Municipal offense","Class 2 Drug Felony","Don't Know/Not Sure"],isRequired:!0,name:"chargeToSeal",title:"What conviction are you looking to seal?",visibleIf:"{chargeDismissedOrAcquitted} = 'No'"}]},{name:"convictionRequirements",visibleIf:"{federalCase} = 'No' and chargeEligibility({chargeToSeal}) > 0",questions:[{type:"radiogroup",choices:["Yes","No","Not Sure"],isRequired:!0,name:"completedSentencing",title:"If you were sentenced at the end of your case, have you completed all sentencing, including supervised or unsupervised probation, parole, community corrections, incarceration, etc?"},{type:"text",inputType:"date",isRequired:!0,name:"enoughTimePassed",title:"In most cases, a certain period of time must go by from the date of conviction, or the final date of completing a sentence, before you can apply to seal your record. What is the month & year you completed your sentencing/supervision?",visibleIf:"{completedSentencing} = 'Yes'"}]},{name:"withinTimeFrame",visibleIf:"{federalCase} = 'No' and hasEnoughTimePassed(chargeEligibility({chargeToSeal}), {enoughTimePassed}) = 'Yes'",questions:[{type:"radiogroup",choices:["Yes","No","Not Sure"],isRequired:!0,name:"paidRestitutionAndFees",title:"Have you paid all restitution, fines, court costs, late fees or other fees ordered by the Court in your case?"},{type:"radiogroup",choices:["Yes","No","Not Sure"],isRequired:!0,name:"attemptedToSeal",title:"Have you attempted to seal your record for this conviction within the past 12 months?",visibleIf:"{paidRestitutionAndFees} = 'Yes'"},{type:"radiogroup",choices:["Yes","No","Not Sure"],isRequired:!0,name:"anyNewOffense",title:"Have you been convicted of or charged with another offense after the conviction you are trying to seal?",visibleIf:"{attemptedToSeal} = 'No'"}]}]},p=n(7),y=n(8),h=n(10),b=n(11),j={title:"Feel free to provide additional demographic data about yourself.",clearInvisibleValues:"onHidden",pages:[{name:"demographicInfo",questions:[{name:"expungementReason",title:"What is your reason for seeking expungement?",type:"checkbox",isRequired:!1,hasOther:!0,otherText:"Other (please describe)",choices:["Housing","Employment","Financial Aid","Remove Stigma","Prefer not to answer"]},{name:"raceEthnicity",title:"I identify my race/ethnic background as:",type:"checkbox",isRequired:!1,hasOther:!0,otherText:"Other (please describe)",choices:["Asian","Black/African American","Hispanic/Latinx","Middle Eastern or North African","Native American or Alaska Native","Native Hawaiian or Other Pacific Islander","White","Prefer not to answer"]},{name:"ageRange",title:"What is your age range?",type:"dropdown",isRequired:!1,choices:["18-24 years old","25-34 years old","35-44 years old","45-54 years old","55-64 years old","65-74 years old","75 years or older","Prefer not to answer"]},{name:"countyInColorado",title:"What county in Colorado did your case take place in?",type:"dropdown",isRequired:!1,choices:["Adams","Alamosa","Arapahoe","Archuleta","Baca","Bent","Boulder","Broomfield","Chaffee","Cheyenne","Clear Creek","Conejos","Costilla","Crowley","Custer","Delta","Denver","Dolores","Douglas","Eagle","Elbert","El Paso","Fremont","Garfield","Gilpin","Grand","Gunnison","Hinsdale","Huerfano","Jackson","Jefferson","Kiowa","Kit Carson","Lake","La Plata","Larimer","Las Animas","Lincoln","Logan","Mesa","Mineral","Moffat","Montezuma","Montrose","Morgan","Otero","Ouray","Park","Phillips","Pitkin","Prowers","Pueblo","Rio Blanco","Rio Grande","Routt","Saguache","San Juan","San Miguel","Sedgwick","Summit","Teller","Washington","Weld","Yuma","Prefer not to answer","N/A"]},{name:"email",title:"If you would like to sign up for our emailing list to be notified of any future events or recording sealing clinics, please provide your email address.",type:"text",isRequired:!1,validators:[{type:"email"}]}]}]},v=n(9),O=n.n(v),S="https://7h8jqdiilc.execute-api.us-west-2.amazonaws.com/dev";function N(e,t){return x.apply(this,arguments)}function x(){return(x=Object(u.a)(l.a.mark((function e(t,n){var o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.put("".concat(S,"/result"),Object(p.a)({type:t},n));case 2:return o=e.sent,console.log(o),e.abrupt("return",o);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var C={navigationButton:"btn-nav",header:"header",container:"container"};var F=function(e){var t=e.surveyModel,n=e.uuid,r=Object(i.useState)(!1),a=Object(d.a)(r,2),s=a[0],c=a[1];function g(){return(g=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!0),e.next=4,N("demographic",Object(p.a)(Object(p.a)({},t.data),{},{uuid:n||null}));case 4:e.sent;case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(o.jsx)("div",{children:s?"Thank you for providing the additional demographic information.":Object(o.jsx)(f.Survey,{css:C,model:t,onComplete:function(e){return g.apply(this,arguments)}})})},w=function(e){var t=e.uuid,n=e.outcomeContent,r=e.loading,a=new f.Model(j);return Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{className:"container outcome",children:r?"Loading more info...":Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("h2",{children:n.title}),Object(b.documentToReactComponents)(n.body,I)]})}),Object(o.jsx)(F,{surveyModel:a,uuid:t})]})},I={renderNode:Object(y.a)({},h.BLOCKS.EMBEDDED_ASSET,(function(e){var t=e.data.target.fields.file;return Object(o.jsx)("img",{src:t.url})}))};var D=n(51),R={navigationButton:"btn-nav",header:"header",container:"container",panel:{footer:"survey-footer"}};var A=function(e){var t=e.percent;return Object(o.jsxs)("div",{className:"progress-container",children:[Object(o.jsx)("div",{className:"progress-value",style:{width:"".concat(t,"%")}}),Object(o.jsx)("div",{className:"progress-background"})]})},T=function(e){var t=e.surveyModel,n=e.version,r=e.setScreenerStarted,a=e.outcomeContent,s=function(e,t){var n=Object(i.useState)((function(){try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(o){return console.log(o),t}})),o=Object(d.a)(n,2),r=o[0],a=o[1];return[r,function(t){try{var n=t instanceof Function?t(r):t;a(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(o){console.log(o)}}]}("screenerSurvey",null),c=Object(d.a)(s,2),g=c[0],m=c[1],y=Object(i.useState)(""),h=Object(d.a)(y,2),b=h[0],j=h[1],v=Object(i.useState)(!0),O=Object(d.a)(v,2),S=O[0],x=O[1],C=Object(i.useState)({}),F=Object(d.a)(C,2),I=F[0],T=F[1],M=Object(i.useState)(1),k=Object(d.a)(M,2),q=k[0],P=k[1],E=q/t.pageCount*100;function Y(e){return B.apply(this,arguments)}function B(){return(B=Object(u.a)(l.a.mark((function e(n){var o,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return P(t.pageCount),j(n.data.outcome),o=a.find((function(e){return e.id===n.data.outcome})),T(o),r=Object(D.a)(),e.next=8,N("expunge-screener",Object(p.a)(Object(p.a)({},n.data),{},{uuid:r}));case 8:e.sent;case 9:m({uuid:r});case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e){var t=e.currentPageNo,n=e.data;P(t+1),m(Object(p.a)(Object(p.a)({},g),{},{currentPageNo:t,data:n}))}return Object(i.useEffect)((function(){t.onComplete.add(Y),t.onValueChanged.add(W),(null===g||void 0===g?void 0:g.version)===n?(t.data=g.data,t.currentPageNo=g.currentPageNo,P(g.currentPageNo+1)):m({version:n})}),[]),Object(i.useEffect)((function(){I.id&&x(!1)}),[I]),Object(o.jsxs)("div",{className:"main",children:[b?Object(o.jsx)(w,{uuid:null===g||void 0===g?void 0:g.uuid,outcomeContent:I,loading:S}):Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(A,{percent:E}),Object(o.jsx)(f.Survey,{css:R,model:t})]}),Object(o.jsx)("div",{className:"text-center",children:Object(o.jsx)("button",{onClick:function(){t.clear(),m(null),x(!0),T({}),j(null),P(1),r(!1)},className:"btn-nav",children:"Reset"})})]})},M=n.p+"static/media/logo.e3327099.png",k=(n(48),function(e){var t=e.setScreenerStarted,n=e.introContent;return Object(o.jsxs)("div",{className:"container",children:[Object(o.jsx)("h2",{children:n.title}),Object(o.jsx)("p",{children:Object(b.documentToReactComponents)(n.description,q)}),Object(o.jsx)("button",{className:"btn-nav",onClick:function(){return t(!0)},children:"Next"})]})}),q={renderNode:Object(y.a)({},h.BLOCKS.EMBEDDED_ASSET,(function(e){var t=e.data.target.fields.file;return Object(o.jsx)("img",{src:t.url})}))},P="https://7h8jqdiilc.execute-api.us-west-2.amazonaws.com/dev";function E(){return Y.apply(this,arguments)}function Y(){return(Y=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("".concat(P,"/content"));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var B=new f.Model(m);B.showPreviewBeforeComplete="showAnsweredQuestions";var W=new g.a("SHA-1","TEXT");W.update(JSON.stringify(m));var H=W.getHash("HEX"),L=function(){var e=Object(i.useState)(!1),t=Object(d.a)(e,2),n=t[0],r=t[1],a=Object(i.useState)(null),c=Object(d.a)(a,2),g=c[0],f=c[1],m=Object(i.useState)(null),p=Object(d.a)(m,2),y=p[0],h=p[1],b=Object(i.useState)(!1),j=Object(d.a)(b,2),v=j[0],O=j[1],S=Object(i.useState)(!1),N=Object(d.a)(S,2),x=N[0],C=N[1];return Object(i.useEffect)(Object(u.a)(l.a.mark((function e(){var t,n,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(!0),e.prev=1,e.next=4,E();case 4:t=e.sent,n=t.data.find((function(e){return"intro"===e.fields.id})).fields,h(n),o=t.data.filter((function(e){return"screenerOutcome"===e.sys.contentType.sys.id})).map((function(e){return e.fields})),f(o),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0),C(!0);case 15:return e.prev=15,O(!1),e.finish(15);case 18:case"end":return e.stop()}}),e,null,[[1,11,15,18]])}))),[]),Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsxs)("div",{className:"app",children:[Object(o.jsx)("img",{src:M,className:"logo"}),Object(o.jsx)("h1",{className:"text-center",children:"Record seal eligibility screener"}),n?Object(o.jsx)(T,{surveyModel:B,version:H,setScreenerStarted:r,outcomeContent:g}):Object(o.jsxs)(o.Fragment,{children:[v&&"Loading more info...",y&&Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(k,{setScreenerStarted:r,introContent:y})}),x&&Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("h4",{children:["Unable to load additional information. Please contact us at"," ",Object(o.jsx)("a",{href:"https://expungecolorado.org",children:"expungecolorado.org"})]})})]})]})})};a.a.render(Object(o.jsx)(L,{}),document.getElementById("root"))}},[[49,1,2]]]);
//# sourceMappingURL=main.4ecba992.chunk.js.map