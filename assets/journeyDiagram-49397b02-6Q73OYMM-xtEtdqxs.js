import{d as yt,p as pt,m as dt,k as nt}from"./chunk-C7567YP5-DP3OBelx.js";import{E as ft,I as gt,a as mt,X as I,t as xt,l as kt,K as _t,Z as bt,Q as vt,J as wt,j as $t,V as X,f as Mt,aU as W}from"./dist-QNDTTFGF-BY-EVaVA.js";import{c as Tt,r as Y}from"./index-DUIAo018.js";Tt();Y(ft(),1);Y(gt(),1);Y(mt(),1);var U=function(){var t=function(f,i,a,c){for(a=a||{},c=f.length;c--;a[f[c]]=i);return a},e=[6,8,10,11,12,14,16,17,18],n=[1,9],l=[1,10],r=[1,11],h=[1,12],o=[1,13],y=[1,14],p={trace:function(){},yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:function(f,i,a,c,u,s,g){var x=s.length-1;switch(u){case 1:return s[x-1];case 2:this.$=[];break;case 3:s[x-1].push(s[x]),this.$=s[x-1];break;case 4:case 5:this.$=s[x];break;case 6:case 7:this.$=[];break;case 8:c.setDiagramTitle(s[x].substr(6)),this.$=s[x].substr(6);break;case 9:this.$=s[x].trim(),c.setAccTitle(this.$);break;case 10:case 11:this.$=s[x].trim(),c.setAccDescription(this.$);break;case 12:c.addSection(s[x].substr(8)),this.$=s[x].substr(8);break;case 13:c.addTask(s[x-1],s[x]),this.$="task";break}},table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:n,12:l,14:r,16:h,17:o,18:y},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:n,12:l,14:r,16:h,17:o,18:y},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:function(f,i){if(i.recoverable)this.trace(f);else{var a=new Error(f);throw a.hash=i,a}},parse:function(f){var i=this,a=[0],c=[],u=[null],s=[],g=this.table,x="",L=0,J=0,ot=2,K=1,ct=s.slice.call(arguments,1),k=Object.create(this.lexer),T={yy:{}};for(var N in this.yy)Object.prototype.hasOwnProperty.call(this.yy,N)&&(T.yy[N]=this.yy[N]);k.setInput(f,T.yy),T.yy.lexer=k,T.yy.parser=this,typeof k.yylloc>"u"&&(k.yylloc={});var R=k.yylloc;s.push(R);var ht=k.options&&k.options.ranges;typeof T.yy.parseError=="function"?this.parseError=T.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ut(){var $;return $=c.pop()||k.lex()||K,typeof $!="number"&&($ instanceof Array&&(c=$,$=c.pop()),$=i.symbols_[$]||$),$}for(var _,S,b,z,C={},D,w,Q,F;;){if(S=a[a.length-1],this.defaultActions[S]?b=this.defaultActions[S]:((_===null||typeof _>"u")&&(_=ut()),b=g[S]&&g[S][_]),typeof b>"u"||!b.length||!b[0]){var B="";F=[];for(D in g[S])this.terminals_[D]&&D>ot&&F.push("'"+this.terminals_[D]+"'");k.showPosition?B="Parse error on line "+(L+1)+`:
`+k.showPosition()+`
Expecting `+F.join(", ")+", got '"+(this.terminals_[_]||_)+"'":B="Parse error on line "+(L+1)+": Unexpected "+(_==K?"end of input":"'"+(this.terminals_[_]||_)+"'"),this.parseError(B,{text:k.match,token:this.terminals_[_]||_,line:k.yylineno,loc:R,expected:F})}if(b[0]instanceof Array&&b.length>1)throw new Error("Parse Error: multiple actions possible at state: "+S+", token: "+_);switch(b[0]){case 1:a.push(_),u.push(k.yytext),s.push(k.yylloc),a.push(b[1]),_=null,J=k.yyleng,x=k.yytext,L=k.yylineno,R=k.yylloc;break;case 2:if(w=this.productions_[b[1]][1],C.$=u[u.length-w],C._$={first_line:s[s.length-(w||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(w||1)].first_column,last_column:s[s.length-1].last_column},ht&&(C._$.range=[s[s.length-(w||1)].range[0],s[s.length-1].range[1]]),z=this.performAction.apply(C,[x,J,L,T.yy,b[1],u,s].concat(ct)),typeof z<"u")return z;w&&(a=a.slice(0,-1*w*2),u=u.slice(0,-1*w),s=s.slice(0,-1*w)),a.push(this.productions_[b[1]][0]),u.push(C.$),s.push(C._$),Q=g[a[a.length-2]][a[a.length-1]],a.push(Q);break;case 3:return!0}}return!0}},m=function(){var f={EOF:1,parseError:function(i,a){if(this.yy.parser)this.yy.parser.parseError(i,a);else throw new Error(i)},setInput:function(i,a){return this.yy=a||this.yy||{},this._input=i,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var i=this._input[0];this.yytext+=i,this.yyleng++,this.offset++,this.match+=i,this.matched+=i;var a=i.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),i},unput:function(i){var a=i.length,c=i.split(/(?:\r\n?|\n)/g);this._input=i+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var u=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var s=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===u.length?this.yylloc.first_column:0)+u[u.length-c.length].length-c[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[s[0],s[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(i){this.unput(this.match.slice(i))},pastInput:function(){var i=this.matched.substr(0,this.matched.length-this.match.length);return(i.length>20?"...":"")+i.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var i=this.match;return i.length<20&&(i+=this._input.substr(0,20-i.length)),(i.substr(0,20)+(i.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var i=this.pastInput(),a=new Array(i.length+1).join("-");return i+this.upcomingInput()+`
`+a+"^"},test_match:function(i,a){var c,u,s;if(this.options.backtrack_lexer&&(s={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(s.yylloc.range=this.yylloc.range.slice(0))),u=i[0].match(/(?:\r\n?|\n).*/g),u&&(this.yylineno+=u.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:u?u[u.length-1].length-u[u.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+i[0].length},this.yytext+=i[0],this.match+=i[0],this.matches=i,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(i[0].length),this.matched+=i[0],c=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),c)return c;if(this._backtrack){for(var g in s)this[g]=s[g];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var i,a,c,u;this._more||(this.yytext="",this.match="");for(var s=this._currentRules(),g=0;g<s.length;g++)if(c=this._input.match(this.rules[s[g]]),c&&(!a||c[0].length>a[0].length)){if(a=c,u=g,this.options.backtrack_lexer){if(i=this.test_match(c,s[g]),i!==!1)return i;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(i=this.test_match(a,s[u]),i!==!1?i:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var i=this.next();return i||this.lex()},begin:function(i){this.conditionStack.push(i)},popState:function(){var i=this.conditionStack.length-1;return i>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(i){return i=this.conditionStack.length-1-Math.abs(i||0),i>=0?this.conditionStack[i]:"INITIAL"},pushState:function(i){this.begin(i)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(i,a,c,u){switch(c){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return f}();p.lexer=m;function d(){this.yy={}}return d.prototype=p,p.Parser=d,new d}();U.parser=U;var St=U,A="",Z=[],j=[],P=[],Et=function(){Z.length=0,j.length=0,A="",P.length=0,$t()},It=function(t){A=t,Z.push(t)},Ct=function(){return Z},At=function(){let t=H(),e=100,n=0;for(;!t&&n<e;)t=H(),n++;return j.push(...P),j},jt=function(){let t=[];return j.forEach(e=>{e.people&&t.push(...e.people)}),[...new Set(t)].sort()},Pt=function(t,e){let n=e.substr(1).split(":"),l=0,r=[];n.length===1?(l=Number(n[0]),r=[]):(l=Number(n[0]),r=n[1].split(","));let h=r.map(y=>y.trim()),o={section:A,type:A,people:h,task:t,score:l};P.push(o)},Vt=function(t){let e={section:A,type:A,description:t,task:t,classes:[]};j.push(e)},H=function(){let t=function(n){return P[n].processed},e=!0;for(let[n,l]of P.entries())t(n),e=e&&l.processed;return e},Lt=function(){return jt()},tt={getConfig:()=>I().journey,clear:Et,setDiagramTitle:xt,getDiagramTitle:kt,setAccTitle:_t,getAccTitle:bt,setAccDescription:vt,getAccDescription:wt,addSection:It,getSections:Ct,getTasks:At,addTask:Pt,addTaskOrg:Vt,getActors:Lt},Dt=t=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,Ft=Dt,G=function(t,e){return yt(t,e)},Ot=function(t,e){let n=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),l=t.append("g");l.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),l.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function r(y){let p=W().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);y.append("path").attr("class","mouth").attr("d",p).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}function h(y){let p=W().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);y.append("path").attr("class","mouth").attr("d",p).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}function o(y){y.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return e.score>3?r(l):e.score<3?h(l):o(l),n},at=function(t,e){let n=t.append("circle");return n.attr("cx",e.cx),n.attr("cy",e.cy),n.attr("class","actor-"+e.pos),n.attr("fill",e.fill),n.attr("stroke",e.stroke),n.attr("r",e.r),n.class!==void 0&&n.attr("class",n.class),e.title!==void 0&&n.append("title").text(e.title),n},st=function(t,e){return pt(t,e)},Nt=function(t,e){function n(r,h,o,y,p){return r+","+h+" "+(r+o)+","+h+" "+(r+o)+","+(h+y-p)+" "+(r+o-p*1.2)+","+(h+y)+" "+r+","+(h+y)}let l=t.append("polygon");l.attr("points",n(e.x,e.y,50,20,7)),l.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,st(t,e)},Rt=function(t,e,n){let l=t.append("g"),r=nt();r.x=e.x,r.y=e.y,r.fill=e.fill,r.width=n.width*e.taskCount+n.diagramMarginX*(e.taskCount-1),r.height=n.height,r.class="journey-section section-type-"+e.num,r.rx=3,r.ry=3,G(l,r),lt(n)(e.text,l,r.x,r.y,r.width,r.height,{class:"journey-section section-type-"+e.num},n,e.colour)},et=-1,zt=function(t,e,n){let l=e.x+n.width/2,r=t.append("g");et++;let h=300+5*30;r.append("line").attr("id","task"+et).attr("x1",l).attr("y1",e.y).attr("x2",l).attr("y2",h).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Ot(r,{cx:l,cy:300+(5-e.score)*30,score:e.score});let o=nt();o.x=e.x,o.y=e.y,o.fill=e.fill,o.width=n.width,o.height=n.height,o.class="task task-type-"+e.num,o.rx=3,o.ry=3,G(r,o);let y=e.x+14;e.people.forEach(p=>{let m=e.actors[p].color,d={cx:y,cy:e.y,r:7,fill:m,stroke:"#000",title:p,pos:e.actors[p].position};at(r,d),y+=10}),lt(n)(e.task,r,o.x,o.y,o.width,o.height,{class:"task"},n,e.colour)},Bt=function(t,e){dt(t,e)},lt=function(){function t(r,h,o,y,p,m,d,f){let i=h.append("text").attr("x",o+p/2).attr("y",y+m/2+5).style("font-color",f).style("text-anchor","middle").text(r);l(i,d)}function e(r,h,o,y,p,m,d,f,i){let{taskFontSize:a,taskFontFamily:c}=f,u=r.split(/<br\s*\/?>/gi);for(let s=0;s<u.length;s++){let g=s*a-a*(u.length-1)/2,x=h.append("text").attr("x",o+p/2).attr("y",y).attr("fill",i).style("text-anchor","middle").style("font-size",a).style("font-family",c);x.append("tspan").attr("x",o+p/2).attr("dy",g).text(u[s]),x.attr("y",y+m/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),l(x,d)}}function n(r,h,o,y,p,m,d,f){let i=h.append("switch"),a=i.append("foreignObject").attr("x",o).attr("y",y).attr("width",p).attr("height",m).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");a.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(r),e(r,i,o,y,p,m,d,f),l(a,d)}function l(r,h){for(let o in h)o in h&&r.attr(o,h[o])}return function(r){return r.textPlacement==="fo"?n:r.textPlacement==="old"?t:e}}(),Xt=function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},V={drawRect:G,drawCircle:at,drawSection:Rt,drawText:st,drawLabel:Nt,drawTask:zt,drawBackgroundRect:Bt,initGraphics:Xt},qt=function(t){Object.keys(t).forEach(function(e){O[e]=t[e]})},M={};function Ut(t){let e=I().journey,n=60;Object.keys(M).forEach(l=>{let r=M[l].color,h={cx:20,cy:n,r:7,fill:r,stroke:"#000",pos:M[l].position};V.drawCircle(t,h);let o={x:40,y:n+7,fill:"#666",text:l,textMargin:e.boxTextMargin|5};V.drawText(t,o),n+=20})}var O=I().journey,E=O.leftMargin,Yt=function(t,e,n,l){let r=I().journey,h=I().securityLevel,o;h==="sandbox"&&(o=X("#i"+e));let y=h==="sandbox"?X(o.nodes()[0].contentDocument.body):X("body");v.init();let p=y.select("#"+e);V.initGraphics(p);let m=l.db.getTasks(),d=l.db.getDiagramTitle(),f=l.db.getActors();for(let g in M)delete M[g];let i=0;f.forEach(g=>{M[g]={color:r.actorColours[i%r.actorColours.length],position:i},i++}),Ut(p),v.insert(0,0,E,Object.keys(M).length*50),Zt(p,m,0);let a=v.getBounds();d&&p.append("text").text(d).attr("x",E).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);let c=a.stopy-a.starty+2*r.diagramMarginY,u=E+a.stopx+2*r.diagramMarginX;Mt(p,c,u,r.useMaxWidth),p.append("line").attr("x1",E).attr("y1",r.height*4).attr("x2",u-E-4).attr("y2",r.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");let s=d?70:0;p.attr("viewBox",`${a.startx} -25 ${u} ${c+s}`),p.attr("preserveAspectRatio","xMinYMin meet"),p.attr("height",c+s+25)},v={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(t,e,n,l){t[e]===void 0?t[e]=n:t[e]=l(n,t[e])},updateBounds:function(t,e,n,l){let r=I().journey,h=this,o=0;function y(p){return function(m){o++;let d=h.sequenceItems.length-o+1;h.updateVal(m,"starty",e-d*r.boxMargin,Math.min),h.updateVal(m,"stopy",l+d*r.boxMargin,Math.max),h.updateVal(v.data,"startx",t-d*r.boxMargin,Math.min),h.updateVal(v.data,"stopx",n+d*r.boxMargin,Math.max),h.updateVal(m,"startx",t-d*r.boxMargin,Math.min),h.updateVal(m,"stopx",n+d*r.boxMargin,Math.max),h.updateVal(v.data,"starty",e-d*r.boxMargin,Math.min),h.updateVal(v.data,"stopy",l+d*r.boxMargin,Math.max)}}this.sequenceItems.forEach(y())},insert:function(t,e,n,l){let r=Math.min(t,n),h=Math.max(t,n),o=Math.min(e,l),y=Math.max(e,l);this.updateVal(v.data,"startx",r,Math.min),this.updateVal(v.data,"starty",o,Math.min),this.updateVal(v.data,"stopx",h,Math.max),this.updateVal(v.data,"stopy",y,Math.max),this.updateBounds(r,o,h,y)},bumpVerticalPos:function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},q=O.sectionFills,it=O.sectionColours,Zt=function(t,e,n){let l=I().journey,r="",h=l.height*2+l.diagramMarginY,o=n+h,y=0,p="#CCC",m="black",d=0;for(let[f,i]of e.entries()){if(r!==i.section){p=q[y%q.length],d=y%q.length,m=it[y%it.length];let c=0,u=i.section;for(let g=f;g<e.length&&e[g].section==u;g++)c=c+1;let s={x:f*l.taskMargin+f*l.width+E,y:50,text:i.section,fill:p,num:d,colour:m,taskCount:c};V.drawSection(t,s,l),r=i.section,y++}let a=i.people.reduce((c,u)=>(M[u]&&(c[u]=M[u]),c),{});i.x=f*l.taskMargin+f*l.width+E,i.y=o,i.width=l.diagramMarginX,i.height=l.diagramMarginY,i.colour=m,i.fill=p,i.num=d,i.actors=a,V.drawTask(t,i,l),v.insert(i.x,i.y,i.x+i.width+l.taskMargin,300+5*30)}},rt={setConf:qt,draw:Yt},Qt={parser:St,db:tt,renderer:rt,styles:Ft,init:t=>{rt.setConf(t.journey),tt.clear()}};export{Qt as diagram};
