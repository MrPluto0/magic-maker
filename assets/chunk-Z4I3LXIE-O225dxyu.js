import{S as V}from"./chunk-UFIBX7QP-BE01Kznc.js";import{m as G}from"./chunk-4IXHFASB-CHXNp9DJ.js";import{c as E,b as u,d as X,X as v,q as j,P as I,n as C,i as A,V as _,e as F,w as M,Y as R,g as W,W as Y,p as Q,h as U}from"./dist-QNDTTFGF-DL-gFEQI.js";import{c as L}from"./index-D1slywUk.js";L();function se(e,l){return!!e.children(l).length}function de(e){return B(e.v)+":"+B(e.w)+":"+B(e.name)}var J=/:/g;function B(e){return e?String(e).replace(J,"\\:"):""}function Z(e,l){l&&e.attr("style",l)}function ce(e,l,d){l&&e.attr("class",l).attr("class",d+" "+e.attr("class"))}function pe(e,l){var d=l.graph();if(Q(d)){var a=d.transition;if(U(a))return a(e)}return e}L();function H(e,l){var d=e.append("foreignObject").attr("width","100000"),a=d.append("xhtml:div");a.attr("xmlns","http://www.w3.org/1999/xhtml");var s=l.label;switch(typeof s){case"function":a.insert(s);break;case"object":a.insert(function(){return s});break;default:a.html(s)}Z(a,l.labelStyle),a.style("display","inline-block"),a.style("white-space","nowrap");var p=a.node().getBoundingClientRect();return d.attr("width",p.width).attr("height",p.height),d}L();var P={},K=function(e){let l=Object.keys(e);for(let d of l)P[d]=e[d]},q=async function(e,l,d,a,s,p){let f=a.select(`[id="${d}"]`),i=Object.keys(e);for(let b of i){let r=e[b],y="default";r.classes.length>0&&(y=r.classes.join(" ")),y=y+" flowchart-label";let h=E(r.styles),t=r.text!==void 0?r.text:r.id,n;if(u.info("vertex",r,r.labelType),r.labelType==="markdown")u.info("vertex",r,r.labelType);else if(X(v().flowchart.htmlLabels))n=H(f,{label:t}).node(),n.parentNode.removeChild(n);else{let k=s.createElementNS("http://www.w3.org/2000/svg","text");k.setAttribute("style",h.labelStyle.replace("color:","fill:"));let T=t.split(j.lineBreakRegex);for(let $ of T){let c=s.createElementNS("http://www.w3.org/2000/svg","tspan");c.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),c.setAttribute("dy","1em"),c.setAttribute("x","1"),c.textContent=$,k.appendChild(c)}n=k}let w=0,o="";switch(r.type){case"round":w=5,o="rect";break;case"square":o="rect";break;case"diamond":o="question";break;case"hexagon":o="hexagon";break;case"odd":o="rect_left_inv_arrow";break;case"lean_right":o="lean_right";break;case"lean_left":o="lean_left";break;case"trapezoid":o="trapezoid";break;case"inv_trapezoid":o="inv_trapezoid";break;case"odd_right":o="rect_left_inv_arrow";break;case"circle":o="circle";break;case"ellipse":o="ellipse";break;case"stadium":o="stadium";break;case"subroutine":o="subroutine";break;case"cylinder":o="cylinder";break;case"group":o="rect";break;case"doublecircle":o="doublecircle";break;default:o="rect"}let S=await I(t,v());l.setNode(r.id,{labelStyle:h.labelStyle,shape:o,labelText:S,labelType:r.labelType,rx:w,ry:w,class:y,style:h.style,id:r.id,link:r.link,linkTarget:r.linkTarget,tooltip:p.db.getTooltip(r.id)||"",domId:p.db.lookUpDomId(r.id),haveCallback:r.haveCallback,width:r.type==="group"?500:void 0,dir:r.dir,type:r.type,props:r.props,padding:v().flowchart.padding}),u.info("setNode",{labelStyle:h.labelStyle,labelType:r.labelType,shape:o,labelText:S,rx:w,ry:w,class:y,style:h.style,id:r.id,domId:p.db.lookUpDomId(r.id),width:r.type==="group"?500:void 0,type:r.type,dir:r.dir,props:r.props,padding:v().flowchart.padding})}},O=async function(e,l,d){u.info("abc78 edges = ",e);let a=0,s={},p,f;if(e.defaultStyle!==void 0){let i=E(e.defaultStyle);p=i.style,f=i.labelStyle}for(let i of e){a++;let b="L-"+i.start+"-"+i.end;s[b]===void 0?(s[b]=0,u.info("abc78 new entry",b,s[b])):(s[b]++,u.info("abc78 new entry",b,s[b]));let r=b+"-"+s[b];u.info("abc78 new link id to be used is",b,r,s[b]);let y="LS-"+i.start,h="LE-"+i.end,t={style:"",labelStyle:""};switch(t.minlen=i.length||1,i.type==="arrow_open"?t.arrowhead="none":t.arrowhead="normal",t.arrowTypeStart="arrow_open",t.arrowTypeEnd="arrow_open",i.type){case"double_arrow_cross":t.arrowTypeStart="arrow_cross";case"arrow_cross":t.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":t.arrowTypeStart="arrow_point";case"arrow_point":t.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":t.arrowTypeStart="arrow_circle";case"arrow_circle":t.arrowTypeEnd="arrow_circle";break}let n="",w="";switch(i.stroke){case"normal":n="fill:none;",p!==void 0&&(n=p),f!==void 0&&(w=f),t.thickness="normal",t.pattern="solid";break;case"dotted":t.thickness="normal",t.pattern="dotted",t.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":t.thickness="thick",t.pattern="solid",t.style="stroke-width: 3.5px;fill:none;";break;case"invisible":t.thickness="invisible",t.pattern="solid",t.style="stroke-width: 0;fill:none;";break}if(i.style!==void 0){let o=E(i.style);n=o.style,w=o.labelStyle}t.style=t.style+=n,t.labelStyle=t.labelStyle+=w,i.interpolate!==void 0?t.curve=C(i.interpolate,A):e.defaultInterpolate!==void 0?t.curve=C(e.defaultInterpolate,A):t.curve=C(P.curve,A),i.text===void 0?i.style!==void 0&&(t.arrowheadStyle="fill: #333"):(t.arrowheadStyle="fill: #333",t.labelpos="c"),t.labelType=i.labelType,t.label=await I(i.text.replace(j.lineBreakRegex,`
`),v()),i.style===void 0&&(t.style=t.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),t.labelStyle=t.labelStyle.replace("color:","fill:"),t.id=r,t.classes="flowchart-link "+y+" "+h,l.setEdge(i.start,i.end,t,a)}},ee=function(e,l){return l.db.getClasses()},te=async function(e,l,d,a){u.info("Drawing flowchart");let s=a.db.getDirection();s===void 0&&(s="TD");let{securityLevel:p,flowchart:f}=v(),i=f.nodeSpacing||50,b=f.rankSpacing||50,r;p==="sandbox"&&(r=_("#i"+l));let y=p==="sandbox"?_(r.nodes()[0].contentDocument.body):_("body"),h=p==="sandbox"?r.nodes()[0].contentDocument:document,t=new G({multigraph:!0,compound:!0}).setGraph({rankdir:s,nodesep:i,ranksep:b,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),n,w=a.db.getSubGraphs();u.info("Subgraphs - ",w);for(let c=w.length-1;c>=0;c--)n=w[c],u.info("Subgraph - ",n),a.db.addVertex(n.id,{text:n.title,type:n.labelType},"group",void 0,n.classes,n.dir);let o=a.db.getVertices(),S=a.db.getEdges();u.info("Edges",S);let k=0;for(k=w.length-1;k>=0;k--){n=w[k],F("cluster").append("text");for(let c=0;c<n.nodes.length;c++)u.info("Setting up subgraphs",n.nodes[c],n.id),t.setParent(n.nodes[c],n.id)}await q(o,t,l,y,h,a),await O(S,t);let T=y.select(`[id="${l}"]`),$=y.select("#"+l+" g");if(await V($,t,["point","circle","cross"],"flowchart",l),M.insertTitle(T,"flowchartTitleText",f.titleTopMargin,a.db.getDiagramTitle()),R(t,T,f.diagramPadding,f.useMaxWidth),a.db.indexNodes("subGraph"+k),!f.htmlLabels){let c=h.querySelectorAll('[id="'+l+'"] .edgeLabel .label');for(let x of c){let m=x.getBBox(),g=h.createElementNS("http://www.w3.org/2000/svg","rect");g.setAttribute("rx",0),g.setAttribute("ry",0),g.setAttribute("width",m.width),g.setAttribute("height",m.height),x.insertBefore(g,x.firstChild)}}Object.keys(o).forEach(function(c){let x=o[c];if(x.link){let m=_("#"+l+' [id="'+c+'"]');if(m){let g=h.createElementNS("http://www.w3.org/2000/svg","a");g.setAttributeNS("http://www.w3.org/2000/svg","class",x.classes.join(" ")),g.setAttributeNS("http://www.w3.org/2000/svg","href",x.link),g.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),p==="sandbox"?g.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):x.linkTarget&&g.setAttributeNS("http://www.w3.org/2000/svg","target",x.linkTarget);let N=m.insert(function(){return g},":first-child"),D=m.select(".label-container");D&&N.append(function(){return D.node()});let z=m.select(".label");z&&N.append(function(){return z.node()})}}})},be={setConf:K,addVertices:q,addEdges:O,getClasses:ee,draw:te},re=(e,l)=>{let d=Y,a=d(e,"r"),s=d(e,"g"),p=d(e,"b");return W(a,s,p,l)},le=e=>`.label {
    font-family: ${e.fontFamily};
    color: ${e.nodeTextColor||e.textColor};
  }
  .cluster-label text {
    fill: ${e.titleColor};
  }
  .cluster-label span,p {
    color: ${e.titleColor};
  }

  .label text,span,p {
    fill: ${e.nodeTextColor||e.textColor};
    color: ${e.nodeTextColor||e.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .katex path {
    fill: #000;
    stroke: #000;
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${e.edgeLabelBackground};
      fill: ${e.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${re(e.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${e.clusterBkg};
    stroke: ${e.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  .cluster span,p {
    color: ${e.titleColor};
  }
  /* .cluster div {
    color: ${e.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`,we=le;export{Z as J,H as Q,de as c,ce as d,se as i,be as m,pe as p,we as v};
