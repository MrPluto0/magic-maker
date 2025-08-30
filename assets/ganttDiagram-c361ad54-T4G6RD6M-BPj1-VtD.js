import{I as Jt,E as te,a as ee,X as st,K as ie,Z as se,t as re,l as ae,Q as ne,J as oe,j as le,b as kt,V as ft,av as ce,aw as de,ax as ue,f as he,ay as fe,az as ye,aA as me,aB as Ft,aC as Wt,aD as Pt,aE as Bt,aF as Ot,aG as jt,aH as zt,aI as ke,q as pe,w as ge,aJ as be,aK as ve,aL as Te,aM as xe,aN as we,aO as _e,aP as $e}from"./dist-QNDTTFGF-D6LxGARR.js";import{a6 as gt,a9 as nt,a7 as _t}from"./index-C9HzHbyJ.js";var De=_t((t,a)=>{gt(),function(r,n){typeof t=="object"&&typeof a<"u"?a.exports=n():typeof define=="function"&&define.amd?define(n):(r=typeof globalThis<"u"?globalThis:r||self).dayjs_plugin_isoWeek=n()}(t,function(){var r="day";return function(n,o,d){var k=function(p){return p.add(4-p.isoWeekday(),r)},v=o.prototype;v.isoWeekYear=function(){return k(this).year()},v.isoWeek=function(p){if(!this.$utils().u(p))return this.add(7*(p-this.isoWeek()),r);var C,D,A,O,W=k(this),u=(C=this.isoWeekYear(),D=this.$u,A=(D?d.utc:d)().year(C).startOf("year"),O=4-A.isoWeekday(),A.isoWeekday()>4&&(O+=7),A.add(O,r));return W.diff(u,"week")+1},v.isoWeekday=function(p){return this.$utils().u(p)?this.day()||7:this.day(this.day()%7?p:p-7)};var L=v.startOf;v.startOf=function(p,C){var D=this.$utils(),A=!!D.u(C)||C;return D.p(p)==="isoweek"?A?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):L.bind(this)(p,C)}}})}),Se=_t((t,a)=>{gt(),function(r,n){typeof t=="object"&&typeof a<"u"?a.exports=n():typeof define=="function"&&define.amd?define(n):(r=typeof globalThis<"u"?globalThis:r||self).dayjs_plugin_customParseFormat=n()}(t,function(){var r={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},n=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,o=/\d\d/,d=/\d\d?/,k=/\d*[^-_:/,()\s\d]+/,v={},L=function(u){return(u=+u)+(u>68?1900:2e3)},p=function(u){return function($){this[u]=+$}},C=[/[+-]\d\d:?(\d\d)?|Z/,function(u){(this.zone||(this.zone={})).offset=function($){if(!$||$==="Z")return 0;var E=$.match(/([+-]|\d\d)/g),M=60*E[1]+(+E[2]||0);return M===0?0:E[0]==="+"?-M:M}(u)}],D=function(u){var $=v[u];return $&&($.indexOf?$:$.s.concat($.f))},A=function(u,$){var E,M=v.meridiem;if(M){for(var j=1;j<=24;j+=1)if(u.indexOf(M(j,0,$))>-1){E=j>12;break}}else E=u===($?"pm":"PM");return E},O={A:[k,function(u){this.afternoon=A(u,!1)}],a:[k,function(u){this.afternoon=A(u,!0)}],S:[/\d/,function(u){this.milliseconds=100*+u}],SS:[o,function(u){this.milliseconds=10*+u}],SSS:[/\d{3}/,function(u){this.milliseconds=+u}],s:[d,p("seconds")],ss:[d,p("seconds")],m:[d,p("minutes")],mm:[d,p("minutes")],H:[d,p("hours")],h:[d,p("hours")],HH:[d,p("hours")],hh:[d,p("hours")],D:[d,p("day")],DD:[o,p("day")],Do:[k,function(u){var $=v.ordinal,E=u.match(/\d+/);if(this.day=E[0],$)for(var M=1;M<=31;M+=1)$(M).replace(/\[|\]/g,"")===u&&(this.day=M)}],M:[d,p("month")],MM:[o,p("month")],MMM:[k,function(u){var $=D("months"),E=(D("monthsShort")||$.map(function(M){return M.slice(0,3)})).indexOf(u)+1;if(E<1)throw new Error;this.month=E%12||E}],MMMM:[k,function(u){var $=D("months").indexOf(u)+1;if($<1)throw new Error;this.month=$%12||$}],Y:[/[+-]?\d+/,p("year")],YY:[o,function(u){this.year=L(u)}],YYYY:[/\d{4}/,p("year")],Z:C,ZZ:C};function W(u){var $,E;$=u,E=v&&v.formats;for(var M=(u=$.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(T,g,y){var s=y&&y.toUpperCase();return g||E[y]||r[y]||E[s].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(c,l,h){return l||h.slice(1)})})).match(n),j=M.length,z=0;z<j;z+=1){var q=M[z],H=O[q],N=H&&H[0],f=H&&H[1];M[z]=f?{regex:N,parser:f}:q.replace(/^\[|\]$/g,"")}return function(T){for(var g={},y=0,s=0;y<j;y+=1){var c=M[y];if(typeof c=="string")s+=c.length;else{var l=c.regex,h=c.parser,i=T.slice(s),_=l.exec(i)[0];h.call(g,_),T=T.replace(_,"")}}return function(e){var m=e.afternoon;if(m!==void 0){var w=e.hours;m?w<12&&(e.hours+=12):w===12&&(e.hours=0),delete e.afternoon}}(g),g}}return function(u,$,E){E.p.customParseFormat=!0,u&&u.parseTwoDigitYear&&(L=u.parseTwoDigitYear);var M=$.prototype,j=M.parse;M.parse=function(z){var q=z.date,H=z.utc,N=z.args;this.$u=H;var f=N[1];if(typeof f=="string"){var T=N[2]===!0,g=N[3]===!0,y=T||g,s=N[2];g&&(s=N[2]),v=this.$locale(),!T&&s&&(v=E.Ls[s]),this.$d=function(i,_,e){try{if(["x","X"].indexOf(_)>-1)return new Date((_==="X"?1e3:1)*i);var m=W(_)(i),w=m.year,S=m.month,x=m.day,Y=m.hours,b=m.minutes,R=m.seconds,J=m.milliseconds,it=m.zone,ot=new Date,lt=x||(w||S?1:ot.getDate()),F=w||ot.getFullYear(),G=0;w&&!S||(G=S>0?S-1:ot.getMonth());var P=Y||0,tt=b||0,U=R||0,V=J||0;return it?new Date(Date.UTC(F,G,lt,P,tt,U,V+60*it.offset*1e3)):e?new Date(Date.UTC(F,G,lt,P,tt,U,V)):new Date(F,G,lt,P,tt,U,V)}catch{return new Date("")}}(q,f,H),this.init(),s&&s!==!0&&(this.$L=this.locale(s).$L),y&&q!=this.format(f)&&(this.$d=new Date("")),v={}}else if(f instanceof Array)for(var c=f.length,l=1;l<=c;l+=1){N[1]=f[l-1];var h=E.apply(this,N);if(h.isValid()){this.$d=h.$d,this.$L=h.$L,this.init();break}l===c&&(this.$d=new Date(""))}else j.call(this,z)}}})}),Ce=_t((t,a)=>{gt(),function(r,n){typeof t=="object"&&typeof a<"u"?a.exports=n():typeof define=="function"&&define.amd?define(n):(r=typeof globalThis<"u"?globalThis:r||self).dayjs_plugin_advancedFormat=n()}(t,function(){return function(r,n){var o=n.prototype,d=o.format;o.format=function(k){var v=this,L=this.$locale();if(!this.isValid())return d.bind(this)(k);var p=this.$utils(),C=(k||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(D){switch(D){case"Q":return Math.ceil((v.$M+1)/3);case"Do":return L.ordinal(v.$D);case"gggg":return v.weekYear();case"GGGG":return v.isoWeekYear();case"wo":return L.ordinal(v.week(),"W");case"w":case"ww":return p.s(v.week(),D==="w"?1:2,"0");case"W":case"WW":return p.s(v.isoWeek(),D==="W"?1:2,"0");case"k":case"kk":return p.s(String(v.$H===0?24:v.$H),D==="k"?1:2,"0");case"X":return Math.floor(v.$d.getTime()/1e3);case"x":return v.$d.getTime();case"z":return"["+v.offsetName()+"]";case"zzz":return"["+v.offsetName("long")+"]";default:return D}});return d.bind(this)(C)}}})});gt();var Ee=nt(Jt(),1),B=nt(te(),1),Me=nt(De(),1),Ye=nt(Se(),1),Ae=nt(Ce(),1);nt(ee(),1);var vt=function(){var t=function(y,s,c,l){for(c=c||{},l=y.length;l--;c[y[l]]=s);return c},a=[6,8,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,33,35,37],r=[1,25],n=[1,26],o=[1,27],d=[1,28],k=[1,29],v=[1,30],L=[1,31],p=[1,9],C=[1,10],D=[1,11],A=[1,12],O=[1,13],W=[1,14],u=[1,15],$=[1,16],E=[1,18],M=[1,19],j=[1,20],z=[1,21],q=[1,22],H=[1,24],N=[1,32],f={trace:function(){},yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,dateFormat:19,inclusiveEndDates:20,topAxis:21,axisFormat:22,tickInterval:23,excludes:24,includes:25,todayMarker:26,title:27,acc_title:28,acc_title_value:29,acc_descr:30,acc_descr_value:31,acc_descr_multiline_value:32,section:33,clickStatement:34,taskTxt:35,taskData:36,click:37,callbackname:38,callbackargs:39,href:40,clickStatementDebug:41,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",19:"dateFormat",20:"inclusiveEndDates",21:"topAxis",22:"axisFormat",23:"tickInterval",24:"excludes",25:"includes",26:"todayMarker",27:"title",28:"acc_title",29:"acc_title_value",30:"acc_descr",31:"acc_descr_value",32:"acc_descr_multiline_value",33:"section",35:"taskTxt",36:"taskData",37:"click",38:"callbackname",39:"callbackargs",40:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[34,2],[34,3],[34,3],[34,4],[34,3],[34,4],[34,2],[41,2],[41,3],[41,3],[41,4],[41,3],[41,4],[41,2]],performAction:function(y,s,c,l,h,i,_){var e=i.length-1;switch(h){case 1:return i[e-1];case 2:this.$=[];break;case 3:i[e-1].push(i[e]),this.$=i[e-1];break;case 4:case 5:this.$=i[e];break;case 6:case 7:this.$=[];break;case 8:l.setWeekday("monday");break;case 9:l.setWeekday("tuesday");break;case 10:l.setWeekday("wednesday");break;case 11:l.setWeekday("thursday");break;case 12:l.setWeekday("friday");break;case 13:l.setWeekday("saturday");break;case 14:l.setWeekday("sunday");break;case 15:l.setDateFormat(i[e].substr(11)),this.$=i[e].substr(11);break;case 16:l.enableInclusiveEndDates(),this.$=i[e].substr(18);break;case 17:l.TopAxis(),this.$=i[e].substr(8);break;case 18:l.setAxisFormat(i[e].substr(11)),this.$=i[e].substr(11);break;case 19:l.setTickInterval(i[e].substr(13)),this.$=i[e].substr(13);break;case 20:l.setExcludes(i[e].substr(9)),this.$=i[e].substr(9);break;case 21:l.setIncludes(i[e].substr(9)),this.$=i[e].substr(9);break;case 22:l.setTodayMarker(i[e].substr(12)),this.$=i[e].substr(12);break;case 24:l.setDiagramTitle(i[e].substr(6)),this.$=i[e].substr(6);break;case 25:this.$=i[e].trim(),l.setAccTitle(this.$);break;case 26:case 27:this.$=i[e].trim(),l.setAccDescription(this.$);break;case 28:l.addSection(i[e].substr(8)),this.$=i[e].substr(8);break;case 30:l.addTask(i[e-1],i[e]),this.$="task";break;case 31:this.$=i[e-1],l.setClickEvent(i[e-1],i[e],null);break;case 32:this.$=i[e-2],l.setClickEvent(i[e-2],i[e-1],i[e]);break;case 33:this.$=i[e-2],l.setClickEvent(i[e-2],i[e-1],null),l.setLink(i[e-2],i[e]);break;case 34:this.$=i[e-3],l.setClickEvent(i[e-3],i[e-2],i[e-1]),l.setLink(i[e-3],i[e]);break;case 35:this.$=i[e-2],l.setClickEvent(i[e-2],i[e],null),l.setLink(i[e-2],i[e-1]);break;case 36:this.$=i[e-3],l.setClickEvent(i[e-3],i[e-1],i[e]),l.setLink(i[e-3],i[e-2]);break;case 37:this.$=i[e-1],l.setLink(i[e-1],i[e]);break;case 38:case 44:this.$=i[e-1]+" "+i[e];break;case 39:case 40:case 42:this.$=i[e-2]+" "+i[e-1]+" "+i[e];break;case 41:case 43:this.$=i[e-3]+" "+i[e-2]+" "+i[e-1]+" "+i[e];break}},table:[{3:1,4:[1,2]},{1:[3]},t(a,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:r,13:n,14:o,15:d,16:k,17:v,18:L,19:p,20:C,21:D,22:A,23:O,24:W,25:u,26:$,27:E,28:M,30:j,32:z,33:q,34:23,35:H,37:N},t(a,[2,7],{1:[2,1]}),t(a,[2,3]),{9:33,11:17,12:r,13:n,14:o,15:d,16:k,17:v,18:L,19:p,20:C,21:D,22:A,23:O,24:W,25:u,26:$,27:E,28:M,30:j,32:z,33:q,34:23,35:H,37:N},t(a,[2,5]),t(a,[2,6]),t(a,[2,15]),t(a,[2,16]),t(a,[2,17]),t(a,[2,18]),t(a,[2,19]),t(a,[2,20]),t(a,[2,21]),t(a,[2,22]),t(a,[2,23]),t(a,[2,24]),{29:[1,34]},{31:[1,35]},t(a,[2,27]),t(a,[2,28]),t(a,[2,29]),{36:[1,36]},t(a,[2,8]),t(a,[2,9]),t(a,[2,10]),t(a,[2,11]),t(a,[2,12]),t(a,[2,13]),t(a,[2,14]),{38:[1,37],40:[1,38]},t(a,[2,4]),t(a,[2,25]),t(a,[2,26]),t(a,[2,30]),t(a,[2,31],{39:[1,39],40:[1,40]}),t(a,[2,37],{38:[1,41]}),t(a,[2,32],{40:[1,42]}),t(a,[2,33]),t(a,[2,35],{39:[1,43]}),t(a,[2,34]),t(a,[2,36])],defaultActions:{},parseError:function(y,s){if(s.recoverable)this.trace(y);else{var c=new Error(y);throw c.hash=s,c}},parse:function(y){var s=this,c=[0],l=[],h=[null],i=[],_=this.table,e="",m=0,w=0,S=2,x=1,Y=i.slice.call(arguments,1),b=Object.create(this.lexer),R={yy:{}};for(var J in this.yy)Object.prototype.hasOwnProperty.call(this.yy,J)&&(R.yy[J]=this.yy[J]);b.setInput(y,R.yy),R.yy.lexer=b,R.yy.parser=this,typeof b.yylloc>"u"&&(b.yylloc={});var it=b.yylloc;i.push(it);var ot=b.options&&b.options.ranges;typeof R.yy.parseError=="function"?this.parseError=R.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function lt(){var Q;return Q=l.pop()||b.lex()||x,typeof Q!="number"&&(Q instanceof Array&&(l=Q,Q=l.pop()),Q=s.symbols_[Q]||Q),Q}for(var F,G,P,tt,U={},V,K,It,ht;;){if(G=c[c.length-1],this.defaultActions[G]?P=this.defaultActions[G]:((F===null||typeof F>"u")&&(F=lt()),P=_[G]&&_[G][F]),typeof P>"u"||!P.length||!P[0]){var bt="";ht=[];for(V in _[G])this.terminals_[V]&&V>S&&ht.push("'"+this.terminals_[V]+"'");b.showPosition?bt="Parse error on line "+(m+1)+`:
`+b.showPosition()+`
Expecting `+ht.join(", ")+", got '"+(this.terminals_[F]||F)+"'":bt="Parse error on line "+(m+1)+": Unexpected "+(F==x?"end of input":"'"+(this.terminals_[F]||F)+"'"),this.parseError(bt,{text:b.match,token:this.terminals_[F]||F,line:b.yylineno,loc:it,expected:ht})}if(P[0]instanceof Array&&P.length>1)throw new Error("Parse Error: multiple actions possible at state: "+G+", token: "+F);switch(P[0]){case 1:c.push(F),h.push(b.yytext),i.push(b.yylloc),c.push(P[1]),F=null,w=b.yyleng,e=b.yytext,m=b.yylineno,it=b.yylloc;break;case 2:if(K=this.productions_[P[1]][1],U.$=h[h.length-K],U._$={first_line:i[i.length-(K||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(K||1)].first_column,last_column:i[i.length-1].last_column},ot&&(U._$.range=[i[i.length-(K||1)].range[0],i[i.length-1].range[1]]),tt=this.performAction.apply(U,[e,w,m,R.yy,P[1],h,i].concat(Y)),typeof tt<"u")return tt;K&&(c=c.slice(0,-1*K*2),h=h.slice(0,-1*K),i=i.slice(0,-1*K)),c.push(this.productions_[P[1]][0]),h.push(U.$),i.push(U._$),It=_[c[c.length-2]][c[c.length-1]],c.push(It);break;case 3:return!0}}return!0}},T=function(){var y={EOF:1,parseError:function(s,c){if(this.yy.parser)this.yy.parser.parseError(s,c);else throw new Error(s)},setInput:function(s,c){return this.yy=c||this.yy||{},this._input=s,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var s=this._input[0];this.yytext+=s,this.yyleng++,this.offset++,this.match+=s,this.matched+=s;var c=s.match(/(?:\r\n?|\n).*/g);return c?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),s},unput:function(s){var c=s.length,l=s.split(/(?:\r\n?|\n)/g);this._input=s+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-c),this.offset-=c;var h=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),l.length-1&&(this.yylineno-=l.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:l?(l.length===h.length?this.yylloc.first_column:0)+h[h.length-l.length].length-l[0].length:this.yylloc.first_column-c},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-c]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(s){this.unput(this.match.slice(s))},pastInput:function(){var s=this.matched.substr(0,this.matched.length-this.match.length);return(s.length>20?"...":"")+s.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var s=this.match;return s.length<20&&(s+=this._input.substr(0,20-s.length)),(s.substr(0,20)+(s.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var s=this.pastInput(),c=new Array(s.length+1).join("-");return s+this.upcomingInput()+`
`+c+"^"},test_match:function(s,c){var l,h,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),h=s[0].match(/(?:\r\n?|\n).*/g),h&&(this.yylineno+=h.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:h?h[h.length-1].length-h[h.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+s[0].length},this.yytext+=s[0],this.match+=s[0],this.matches=s,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(s[0].length),this.matched+=s[0],l=this.performAction.call(this,this.yy,this,c,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),l)return l;if(this._backtrack){for(var _ in i)this[_]=i[_];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var s,c,l,h;this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),_=0;_<i.length;_++)if(l=this._input.match(this.rules[i[_]]),l&&(!c||l[0].length>c[0].length)){if(c=l,h=_,this.options.backtrack_lexer){if(s=this.test_match(l,i[_]),s!==!1)return s;if(this._backtrack){c=!1;continue}else return!1}else if(!this.options.flex)break}return c?(s=this.test_match(c,i[h]),s!==!1?s:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var s=this.next();return s||this.lex()},begin:function(s){this.conditionStack.push(s)},popState:function(){var s=this.conditionStack.length-1;return s>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(s){return s=this.conditionStack.length-1-Math.abs(s||0),s>=0?this.conditionStack[s]:"INITIAL"},pushState:function(s){this.begin(s)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(s,c,l,h){switch(l){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),28;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),30;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 40;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 38;case 21:this.popState();break;case 22:return 39;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 37;case 26:return 4;case 27:return 19;case 28:return 20;case 29:return 21;case 30:return 22;case 31:return 23;case 32:return 25;case 33:return 24;case 34:return 26;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return"date";case 43:return 27;case 44:return"accDescription";case 45:return 33;case 46:return 35;case 47:return 36;case 48:return":";case 49:return 6;case 50:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],inclusive:!0}}};return y}();f.lexer=T;function g(){this.yy={}}return g.prototype=f,f.Parser=g,new g}();vt.parser=vt;var Le=vt;B.default.extend(Me.default);B.default.extend(Ye.default);B.default.extend(Ae.default);var Z="",$t="",Dt,St="",ct=[],dt=[],Ct={},Et=[],pt=[],at="",Mt="",Gt=["active","done","crit","milestone"],Yt=[],ut=!1,At=!1,Lt="sunday",Tt=0,Ie=function(){Et=[],pt=[],at="",Yt=[],yt=0,wt=void 0,mt=void 0,I=[],Z="",$t="",Mt="",Dt=void 0,St="",ct=[],dt=[],ut=!1,At=!1,Tt=0,Ct={},le(),Lt="sunday"},Fe=function(t){$t=t},We=function(){return $t},Pe=function(t){Dt=t},Be=function(){return Dt},Oe=function(t){St=t},je=function(){return St},ze=function(t){Z=t},Ne=function(){ut=!0},He=function(){return ut},Ge=function(){At=!0},Re=function(){return At},qe=function(t){Mt=t},Ue=function(){return Mt},Ze=function(){return Z},Ke=function(t){ct=t.toLowerCase().split(/[\s,]+/)},Qe=function(){return ct},Xe=function(t){dt=t.toLowerCase().split(/[\s,]+/)},Ve=function(){return dt},Je=function(){return Ct},ti=function(t){at=t,Et.push(t)},ei=function(){return Et},ii=function(){let t=Nt(),a=10,r=0;for(;!t&&r<a;)t=Nt(),r++;return pt=I,pt},Rt=function(t,a,r,n){return n.includes(t.format(a.trim()))?!1:t.isoWeekday()>=6&&r.includes("weekends")||r.includes(t.format("dddd").toLowerCase())?!0:r.includes(t.format(a.trim()))},si=function(t){Lt=t},ri=function(){return Lt},qt=function(t,a,r,n){if(!r.length||t.manualEndTime)return;let o;t.startTime instanceof Date?o=(0,B.default)(t.startTime):o=(0,B.default)(t.startTime,a,!0),o=o.add(1,"d");let d;t.endTime instanceof Date?d=(0,B.default)(t.endTime):d=(0,B.default)(t.endTime,a,!0);let[k,v]=ai(o,d,a,r,n);t.endTime=k.toDate(),t.renderEndTime=v},ai=function(t,a,r,n,o){let d=!1,k=null;for(;t<=a;)d||(k=a.toDate()),d=Rt(t,r,n,o),d&&(a=a.add(1,"d")),t=t.add(1,"d");return[a,k]},xt=function(t,a,r){r=r.trim();let n=/^after\s+(?<ids>[\d\w- ]+)/.exec(r);if(n!==null){let d=null;for(let v of n.groups.ids.split(" ")){let L=et(v);L!==void 0&&(!d||L.endTime>d.endTime)&&(d=L)}if(d)return d.endTime;let k=new Date;return k.setHours(0,0,0,0),k}let o=(0,B.default)(r,a.trim(),!0);if(o.isValid())return o.toDate();{kt.debug("Invalid date:"+r),kt.debug("With date format:"+a.trim());let d=new Date(r);if(d===void 0||isNaN(d.getTime())||d.getFullYear()<-1e4||d.getFullYear()>1e4)throw new Error("Invalid date:"+r);return d}},Ut=function(t){let a=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return a!==null?[Number.parseFloat(a[1]),a[2]]:[NaN,"ms"]},Zt=function(t,a,r,n=!1){r=r.trim();let o=/^until\s+(?<ids>[\d\w- ]+)/.exec(r);if(o!==null){let p=null;for(let D of o.groups.ids.split(" ")){let A=et(D);A!==void 0&&(!p||A.startTime<p.startTime)&&(p=A)}if(p)return p.startTime;let C=new Date;return C.setHours(0,0,0,0),C}let d=(0,B.default)(r,a.trim(),!0);if(d.isValid())return n&&(d=d.add(1,"d")),d.toDate();let k=(0,B.default)(t),[v,L]=Ut(r);if(!Number.isNaN(v)){let p=k.add(v,L);p.isValid()&&(k=p)}return k.toDate()},yt=0,rt=function(t){return t===void 0?(yt=yt+1,"task"+yt):t},ni=function(t,a){let r;a.substr(0,1)===":"?r=a.substr(1,a.length):r=a;let n=r.split(","),o={};Vt(n,o,Gt);for(let k=0;k<n.length;k++)n[k]=n[k].trim();let d="";switch(n.length){case 1:o.id=rt(),o.startTime=t.endTime,d=n[0];break;case 2:o.id=rt(),o.startTime=xt(void 0,Z,n[0]),d=n[1];break;case 3:o.id=rt(n[0]),o.startTime=xt(void 0,Z,n[1]),d=n[2];break}return d&&(o.endTime=Zt(o.startTime,Z,d,ut),o.manualEndTime=(0,B.default)(d,"YYYY-MM-DD",!0).isValid(),qt(o,Z,dt,ct)),o},oi=function(t,a){let r;a.substr(0,1)===":"?r=a.substr(1,a.length):r=a;let n=r.split(","),o={};Vt(n,o,Gt);for(let d=0;d<n.length;d++)n[d]=n[d].trim();switch(n.length){case 1:o.id=rt(),o.startTime={type:"prevTaskEnd",id:t},o.endTime={data:n[0]};break;case 2:o.id=rt(),o.startTime={type:"getStartDate",startData:n[0]},o.endTime={data:n[1]};break;case 3:o.id=rt(n[0]),o.startTime={type:"getStartDate",startData:n[1]},o.endTime={data:n[2]};break}return o},wt,mt,I=[],Kt={},li=function(t,a){let r={section:at,type:at,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:a},task:t,classes:[]},n=oi(mt,a);r.raw.startTime=n.startTime,r.raw.endTime=n.endTime,r.id=n.id,r.prevTaskId=mt,r.active=n.active,r.done=n.done,r.crit=n.crit,r.milestone=n.milestone,r.order=Tt,Tt++;let o=I.push(r);mt=r.id,Kt[r.id]=o-1},et=function(t){let a=Kt[t];return I[a]},ci=function(t,a){let r={section:at,type:at,description:t,task:t,classes:[]},n=ni(wt,a);r.startTime=n.startTime,r.endTime=n.endTime,r.id=n.id,r.active=n.active,r.done=n.done,r.crit=n.crit,r.milestone=n.milestone,wt=r,pt.push(r)},Nt=function(){let t=function(r){let n=I[r],o="";switch(I[r].raw.startTime.type){case"prevTaskEnd":{let d=et(n.prevTaskId);n.startTime=d.endTime;break}case"getStartDate":o=xt(void 0,Z,I[r].raw.startTime.startData),o&&(I[r].startTime=o);break}return I[r].startTime&&(I[r].endTime=Zt(I[r].startTime,Z,I[r].raw.endTime.data,ut),I[r].endTime&&(I[r].processed=!0,I[r].manualEndTime=(0,B.default)(I[r].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),qt(I[r],Z,dt,ct))),I[r].processed},a=!0;for(let[r,n]of I.entries())t(r),a=a&&n.processed;return a},di=function(t,a){let r=a;st().securityLevel!=="loose"&&(r=(0,Ee.sanitizeUrl)(a)),t.split(",").forEach(function(n){et(n)!==void 0&&(Xt(n,()=>{window.open(r,"_self")}),Ct[n]=r)}),Qt(t,"clickable")},Qt=function(t,a){t.split(",").forEach(function(r){let n=et(r);n!==void 0&&n.classes.push(a)})},ui=function(t,a,r){if(st().securityLevel!=="loose"||a===void 0)return;let n=[];if(typeof r=="string"){n=r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let o=0;o<n.length;o++){let d=n[o].trim();d.charAt(0)==='"'&&d.charAt(d.length-1)==='"'&&(d=d.substr(1,d.length-2)),n[o]=d}}n.length===0&&n.push(t),et(t)!==void 0&&Xt(t,()=>{ge.runFunc(a,...n)})},Xt=function(t,a){Yt.push(function(){let r=document.querySelector(`[id="${t}"]`);r!==null&&r.addEventListener("click",function(){a()})},function(){let r=document.querySelector(`[id="${t}-text"]`);r!==null&&r.addEventListener("click",function(){a()})})},hi=function(t,a,r){t.split(",").forEach(function(n){ui(n,a,r)}),Qt(t,"clickable")},fi=function(t){Yt.forEach(function(a){a(t)})},yi={getConfig:()=>st().gantt,clear:Ie,setDateFormat:ze,getDateFormat:Ze,enableInclusiveEndDates:Ne,endDatesAreInclusive:He,enableTopAxis:Ge,topAxisEnabled:Re,setAxisFormat:Fe,getAxisFormat:We,setTickInterval:Pe,getTickInterval:Be,setTodayMarker:Oe,getTodayMarker:je,setAccTitle:ie,getAccTitle:se,setDiagramTitle:re,getDiagramTitle:ae,setDisplayMode:qe,getDisplayMode:Ue,setAccDescription:ne,getAccDescription:oe,addSection:ti,getSections:ei,getTasks:ii,addTask:li,findTaskById:et,addTaskOrg:ci,setIncludes:Ke,getIncludes:Qe,setExcludes:Xe,getExcludes:Ve,setClickEvent:hi,setLink:di,getLinks:Je,bindFunctions:fi,parseDuration:Ut,isInvalidDate:Rt,setWeekday:si,getWeekday:ri};function Vt(t,a,r){let n=!0;for(;n;)n=!1,r.forEach(function(o){let d="^\\s*"+o+"\\s*$",k=new RegExp(d);t[0].match(k)&&(a[o]=!0,t.shift(1),n=!0)})}var mi=function(){kt.debug("Something is calling, setConf, remove the call")},Ht={monday:be,tuesday:ve,wednesday:Te,thursday:xe,friday:we,saturday:_e,sunday:$e},ki=(t,a)=>{let r=[...t].map(()=>-1/0),n=[...t].sort((d,k)=>d.startTime-k.startTime||d.order-k.order),o=0;for(let d of n)for(let k=0;k<r.length;k++)if(d.startTime>=r[k]){r[k]=d.endTime,d.order=k+a,k>o&&(o=k);break}return o},X,pi=function(t,a,r,n){let o=st().gantt,d=st().securityLevel,k;d==="sandbox"&&(k=ft("#i"+a));let v=d==="sandbox"?ft(k.nodes()[0].contentDocument.body):ft("body"),L=d==="sandbox"?k.nodes()[0].contentDocument:document,p=L.getElementById(a);X=p.parentElement.offsetWidth,X===void 0&&(X=1200),o.useWidth!==void 0&&(X=o.useWidth);let C=n.db.getTasks(),D=[];for(let f of C)D.push(f.type);D=N(D);let A={},O=2*o.topPadding;if(n.db.getDisplayMode()==="compact"||o.displayMode==="compact"){let f={};for(let g of C)f[g.section]===void 0?f[g.section]=[g]:f[g.section].push(g);let T=0;for(let g of Object.keys(f)){let y=ki(f[g],T)+1;T+=y,O+=y*(o.barHeight+o.barGap),A[g]=y}}else{O+=C.length*(o.barHeight+o.barGap);for(let f of D)A[f]=C.filter(T=>T.type===f).length}p.setAttribute("viewBox","0 0 "+X+" "+O);let W=v.select(`[id="${a}"]`),u=ce().domain([de(C,function(f){return f.startTime}),ue(C,function(f){return f.endTime})]).rangeRound([0,X-o.leftPadding-o.rightPadding]);function $(f,T){let g=f.startTime,y=T.startTime,s=0;return g>y?s=1:g<y&&(s=-1),s}C.sort($),E(C,X,O),he(W,O,X,o.useMaxWidth),W.append("text").text(n.db.getDiagramTitle()).attr("x",X/2).attr("y",o.titleTopMargin).attr("class","titleText");function E(f,T,g){let y=o.barHeight,s=y+o.barGap,c=o.topPadding,l=o.leftPadding,h=fe().domain([0,D.length]).range(["#00B9FA","#F95002"]).interpolate(ye);j(s,c,l,T,g,f,n.db.getExcludes(),n.db.getIncludes()),z(l,c,T,g),M(f,s,c,l,y,h,T),q(s,c),H(l,c,T,g)}function M(f,T,g,y,s,c,l){let h=[...new Set(f.map(e=>e.order))].map(e=>f.find(m=>m.order===e));W.append("g").selectAll("rect").data(h).enter().append("rect").attr("x",0).attr("y",function(e,m){return m=e.order,m*T+g-2}).attr("width",function(){return l-o.rightPadding/2}).attr("height",T).attr("class",function(e){for(let[m,w]of D.entries())if(e.type===w)return"section section"+m%o.numberSectionStyles;return"section section0"});let i=W.append("g").selectAll("rect").data(f).enter(),_=n.db.getLinks();if(i.append("rect").attr("id",function(e){return e.id}).attr("rx",3).attr("ry",3).attr("x",function(e){return e.milestone?u(e.startTime)+y+.5*(u(e.endTime)-u(e.startTime))-.5*s:u(e.startTime)+y}).attr("y",function(e,m){return m=e.order,m*T+g}).attr("width",function(e){return e.milestone?s:u(e.renderEndTime||e.endTime)-u(e.startTime)}).attr("height",s).attr("transform-origin",function(e,m){return m=e.order,(u(e.startTime)+y+.5*(u(e.endTime)-u(e.startTime))).toString()+"px "+(m*T+g+.5*s).toString()+"px"}).attr("class",function(e){let m="task",w="";e.classes.length>0&&(w=e.classes.join(" "));let S=0;for(let[Y,b]of D.entries())e.type===b&&(S=Y%o.numberSectionStyles);let x="";return e.active?e.crit?x+=" activeCrit":x=" active":e.done?e.crit?x=" doneCrit":x=" done":e.crit&&(x+=" crit"),x.length===0&&(x=" task"),e.milestone&&(x=" milestone "+x),x+=S,x+=" "+w,m+x}),i.append("text").attr("id",function(e){return e.id+"-text"}).text(function(e){return e.task}).attr("font-size",o.fontSize).attr("x",function(e){let m=u(e.startTime),w=u(e.renderEndTime||e.endTime);e.milestone&&(m+=.5*(u(e.endTime)-u(e.startTime))-.5*s),e.milestone&&(w=m+s);let S=this.getBBox().width;return S>w-m?w+S+1.5*o.leftPadding>l?m+y-5:w+y+5:(w-m)/2+m+y}).attr("y",function(e,m){return m=e.order,m*T+o.barHeight/2+(o.fontSize/2-2)+g}).attr("text-height",s).attr("class",function(e){let m=u(e.startTime),w=u(e.endTime);e.milestone&&(w=m+s);let S=this.getBBox().width,x="";e.classes.length>0&&(x=e.classes.join(" "));let Y=0;for(let[R,J]of D.entries())e.type===J&&(Y=R%o.numberSectionStyles);let b="";return e.active&&(e.crit?b="activeCritText"+Y:b="activeText"+Y),e.done?e.crit?b=b+" doneCritText"+Y:b=b+" doneText"+Y:e.crit&&(b=b+" critText"+Y),e.milestone&&(b+=" milestoneText"),S>w-m?w+S+1.5*o.leftPadding>l?x+" taskTextOutsideLeft taskTextOutside"+Y+" "+b:x+" taskTextOutsideRight taskTextOutside"+Y+" "+b+" width-"+S:x+" taskText taskText"+Y+" "+b+" width-"+S}),st().securityLevel==="sandbox"){let e;e=ft("#i"+a);let m=e.nodes()[0].contentDocument;i.filter(function(w){return _[w.id]!==void 0}).each(function(w){var S=m.querySelector("#"+w.id),x=m.querySelector("#"+w.id+"-text");let Y=S.parentNode;var b=m.createElement("a");b.setAttribute("xlink:href",_[w.id]),b.setAttribute("target","_top"),Y.appendChild(b),b.appendChild(S),b.appendChild(x)})}}function j(f,T,g,y,s,c,l,h){if(l.length===0&&h.length===0)return;let i,_;for(let{startTime:x,endTime:Y}of c)(i===void 0||x<i)&&(i=x),(_===void 0||Y>_)&&(_=Y);if(!i||!_)return;if((0,B.default)(_).diff((0,B.default)(i),"year")>5){kt.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}let e=n.db.getDateFormat(),m=[],w=null,S=(0,B.default)(i);for(;S.valueOf()<=_;)n.db.isInvalidDate(S,e,l,h)?w?w.end=S:w={start:S,end:S}:w&&(m.push(w),w=null),S=S.add(1,"d");W.append("g").selectAll("rect").data(m).enter().append("rect").attr("id",function(x){return"exclude-"+x.start.format("YYYY-MM-DD")}).attr("x",function(x){return u(x.start)+g}).attr("y",o.gridLineStartPadding).attr("width",function(x){let Y=x.end.add(1,"day");return u(Y)-u(x.start)}).attr("height",s-T-o.gridLineStartPadding).attr("transform-origin",function(x,Y){return(u(x.start)+g+.5*(u(x.end)-u(x.start))).toString()+"px "+(Y*f+.5*s).toString()+"px"}).attr("class","exclude-range")}function z(f,T,g,y){let s=me(u).tickSize(-y+T+o.gridLineStartPadding).tickFormat(Ft(n.db.getAxisFormat()||o.axisFormat||"%Y-%m-%d")),c=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(n.db.getTickInterval()||o.tickInterval);if(c!==null){let l=c[1],h=c[2],i=n.db.getWeekday()||o.weekday;switch(h){case"millisecond":s.ticks(zt.every(l));break;case"second":s.ticks(jt.every(l));break;case"minute":s.ticks(Ot.every(l));break;case"hour":s.ticks(Bt.every(l));break;case"day":s.ticks(Pt.every(l));break;case"week":s.ticks(Ht[i].every(l));break;case"month":s.ticks(Wt.every(l));break}}if(W.append("g").attr("class","grid").attr("transform","translate("+f+", "+(y-50)+")").call(s).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),n.db.topAxisEnabled()||o.topAxis){let l=ke(u).tickSize(-y+T+o.gridLineStartPadding).tickFormat(Ft(n.db.getAxisFormat()||o.axisFormat||"%Y-%m-%d"));if(c!==null){let h=c[1],i=c[2],_=n.db.getWeekday()||o.weekday;switch(i){case"millisecond":l.ticks(zt.every(h));break;case"second":l.ticks(jt.every(h));break;case"minute":l.ticks(Ot.every(h));break;case"hour":l.ticks(Bt.every(h));break;case"day":l.ticks(Pt.every(h));break;case"week":l.ticks(Ht[_].every(h));break;case"month":l.ticks(Wt.every(h));break}}W.append("g").attr("class","grid").attr("transform","translate("+f+", "+T+")").call(l).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function q(f,T){let g=0,y=Object.keys(A).map(s=>[s,A[s]]);W.append("g").selectAll("text").data(y).enter().append(function(s){let c=s[0].split(pe.lineBreakRegex),l=-(c.length-1)/2,h=L.createElementNS("http://www.w3.org/2000/svg","text");h.setAttribute("dy",l+"em");for(let[i,_]of c.entries()){let e=L.createElementNS("http://www.w3.org/2000/svg","tspan");e.setAttribute("alignment-baseline","central"),e.setAttribute("x","10"),i>0&&e.setAttribute("dy","1em"),e.textContent=_,h.appendChild(e)}return h}).attr("x",10).attr("y",function(s,c){if(c>0)for(let l=0;l<c;l++)return g+=y[c-1][1],s[1]*f/2+g*f+T;else return s[1]*f/2+T}).attr("font-size",o.sectionFontSize).attr("class",function(s){for(let[c,l]of D.entries())if(s[0]===l)return"sectionTitle sectionTitle"+c%o.numberSectionStyles;return"sectionTitle"})}function H(f,T,g,y){let s=n.db.getTodayMarker();if(s==="off")return;let c=W.append("g").attr("class","today"),l=new Date,h=c.append("line");h.attr("x1",u(l)+f).attr("x2",u(l)+f).attr("y1",o.titleTopMargin).attr("y2",y-o.titleTopMargin).attr("class","today"),s!==""&&h.attr("style",s.replace(/,/g,";"))}function N(f){let T={},g=[];for(let y=0,s=f.length;y<s;++y)Object.prototype.hasOwnProperty.call(T,f[y])||(T[f[y]]=!0,g.push(f[y]));return g}},gi={setConf:mi,draw:pi},bi=t=>`
  .mermaid-main-font {
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }
`,vi=bi,wi={parser:Le,db:yi,renderer:gi,styles:vi};export{wi as diagram};
