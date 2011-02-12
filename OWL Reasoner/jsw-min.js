var jsw;if(!jsw){jsw={owl:{},rdf:{},util:{},xsd:{}}}else{throw'Unable to run the script! Namespace "jsw" exists already!'}jsw.owl.EXPRESSION_TYPES={AXIOM_CLASS_SUB:0,AXIOM_CLASS_EQ:1,AXIOM_OPROP_SUB:2,AXIOM_OPROP_EQ:3,CE_INTERSECT:4,CE_OBJ_VALUES_FROM:5,ET_CLASS:6,ET_OPROP:7,ET_INDIVIDUAL:8,FACT_CLASS:9,FACT_OPROP:10,OPE_CHAIN:11};jsw.owl.IRIS={THING:"owl:Thing"};jsw.rdf.IRIS={TYPE:"http://www.w3.org/1999/02/22-rdf-syntax-ns#type"};jsw.xsd.DATA_TYPES={BOOLEAN:"http://www.w3.org/2001/XMLSchema#boolean",DECIMAL:"http://www.w3.org/2001/XMLSchema#decimal",DOUBLE:"http://www.w3.org/2001/XMLSchema#double",INTEGER:"http://www.w3.org/2001/XMLSchema#integer",STRING:"http://www.w3.org/2001/XMLSchema#string"};jsw.owl.xml={parse:function(j,f){var s=jsw.owl.EXPRESSION_TYPES,l,h=new jsw.owl.Ontology(),p=h.axioms,m=h.prefixes;function o(y,w,x){var u,z,v,A,t;if(x.nodeName!==w){throw w+" element expected, but not found!"}u=x.getAttribute("abbreviatedIRI");A=x.getAttribute("IRI");if((!A&&!u)||(A&&u)){throw"One and only one IRI or abbreviatedIRI attribute must be present in "+x.nodeName+" element!"}if(!u){return h.createEntity(y,A)}else{z=u.indexOf(":");if(z>=0){if(z===u.length-1){throw'Abbreviated IRI "'+u+'" does not contain anything after the prefix!'}t=u.substring(0,z);if(!m[t]){throw'Unknown prefix "'+t+'" in abbreviated  IRI "'+u+'"!'}A=m[t]+u.substring(z+1)}else{throw'Abbreviated IRI "'+u+'" does not contain a prefix name!'}v=h.createEntity(y,A,t);v.abbrIri=u;return true}}function e(t){var v=[],u=t.firstChild;while(u){if(u.nodeType===1){v.push(k(u))}u=u.nextSibling}return{type:s.CE_INTERSECT,args:v}}function a(t){var u,w,v;v=t.firstChild;while(v){if(v.nodeType!==1){v=v.nextSibling;continue}if(!u){u=o(s.ET_OPROP,"ObjectProperty",v)}else{if(!w){w=k(v)}else{throw"The format of ObjectSomeValuesFrom expression is incorrect!"}}v=v.nextSibling}if(!u||!w){throw"The format of ObjectSomeValuesFrom expression is incorrect!"}return{type:s.CE_OBJ_VALUES_FROM,opropExpr:u,classExpr:w}}function k(t){switch(t.nodeName){case"ObjectIntersectionOf":return e(t);case"ObjectSomeValuesFrom":return a(t);default:return o(s.ET_CLASS,"Class",t)}}function d(v){var u=[],w=v.firstChild,t=s.ET_OPROP;while(w){if(w.nodeType===1){u.push(o(t,"ObjectProperty",w))}w=w.nextSibling}if(u.length<2){throw"The object property chain should contain at least 2 object properties!"}return{type:s.OPE_CHAIN,args:u}}function b(w){var u,v,x,t;t=s.ET_OPROP;x=w.firstChild;while(x){if(x.nodeType!==1){x=x.nextSibling;continue}if(!u){if(x.nodeName==="ObjectPropertyChain"){u=d(x)}else{u=o(t,"ObjectProperty",x)}}else{if(!v){v=o(t,"ObjectProperty",x)}else{throw"The format of SubObjectPropertyOf axiom is incorrect!"}}x=x.nextSibling}if(!u||!v){throw"The format of SubObjectPropertyOf axiom is incorrect!"}p.push({type:s.AXIOM_OPROP_SUB,arg1:u,arg2:v})}function c(x,w,t,v){var u=[],y=w.firstChild;while(y){if(y.nodeType===1){u.push(k(y))}y=y.nextSibling}if(!isNaN(t)&&u.length<t){throw"Class axiom contains less than "+t+" class expressions!"}if(!isNaN(v)&&u.length>v){throw"Class axiom contains more than "+v+" class expressions!"}p.push({type:x,args:u})}function r(v){var u=[],w=v.firstChild,t=s.ET_OPROP;while(w){if(w.nodeType===1){u.push(o(t,"ObjectProperty",w))}w=w.nextSibling}if(u.length<2){throw"EquivalentObjectProperties axiom contains less than 2 child elements!"}p.push({type:s.AXIOM_OPROP_EQ,args:u})}function g(u){var w,t,v;v=u.firstChild;while(v){if(v.nodeType!==1){v=v.nextSibling;continue}if(!w){w=k(v)}else{if(!t){t=o(s.ET_INDIVIDUAL,"NamedIndividual",v)}else{throw"Incorrect format of the ClassAssertion element!"}}v=v.nextSibling}if(!w||!t){throw"Incorrect format of the ClassAssertion element!"}p.push({type:s.FACT_CLASS,individual:t,classExpr:w})}function q(x){var w,u,y,v,t;w=s.ET_INDIVIDUAL;y=x.firstChild;while(y){if(y.nodeType!==1){y=y.nextSibling;continue}if(!v){v=o(s.ET_OPROP,"ObjectProperty",y)}else{if(!u){u=o(w,"NamedIndividual",y)}else{if(!t){t=o(w,"NamedIndividual",y)}else{throw"Incorrect format of the ObjectPropertyAssertion element!"}}}y=y.nextSibling}if(!v||!u||!t){throw"Incorrect format of the ObjectPropertyAssertion element!"}p.push({type:s.FACT_OPROP,leftIndividual:u,objectProperty:v,rightIndividual:t})}function i(v){var u=v.getAttribute("name"),t=v.getAttribute("IRI");if(u===null||!t){throw"Incorrect format of Prefix element!"}h.addPrefix(u,t)}l=jsw.util.xml.parseString(j).documentElement.firstChild;while(l){if(l.nodeType===1){if(l.nodeName==="Prefix"){i(l)}else{break}}l=l.nextSibling}while(l){if(l.nodeType!==1){l=l.nextSibling;continue}try{switch(l.nodeName){case"SubClassOf":c(s.AXIOM_CLASS_SUB,l,2,2);break;case"EquivalentClasses":c(s.AXIOM_CLASS_EQ,l,2);break;case"SubObjectPropertyOf":b(l);break;case"EquivalentObjectProperties":r(s.AXIOM_OPROP_EQ,l);break;case"ClassAssertion":g(l);break;case"ObjectPropertyAssertion":q(l);break;case"Prefix":throw"Prefix elements should be at the start of the document!"}}catch(n){if(!f||!f(n)){throw n}}l=l.nextSibling}return h},write:function(j){var g,k=j.axioms,l=k.length,m,t=jsw.owl.EXPRESSION_TYPES,n="<Ontology>",p=j.prefixes,b;function f(u,v){var w="<"+v;if(u.abbrIri){w+=' abbreviatedIRI="'+u.abbrIri+'"'}else{w+=' IRI="'+u.IRI+'"'}w+="/>";return w}function o(w){var v="<ObjectIntersectionOf>",y=w.args,u=y.length,x;for(x=0;x<u;x++){v+=r(y[x])}v+="</ObjectIntersectionOf>";return v}function q(u){return"<ObjectSomeValuesFrom>"+f(u.opropExpr,"ObjectProperty")+r(u.classExpr)+"</ObjectSomeValuesFrom>"}function r(u){switch(u.type){case t.ET_CLASS:return f(u,"Class");case t.CE_INTERSECT:return o(u);case t.CE_OBJ_VALUES_FROM:return q(u);default:throw"Uncrecognized class expression!"}}function c(v,u){var w=v.args,z=w.length,y,x="<"+u+">";for(y=0;y<z;y++){x+=r(w[y])}x+="</"+u+">";return x}function e(x){var u=x.args,y=u.length,w,v="<ObjectPropertyChain>";for(w=0;w<y;w++){v+=f(u[w],"ObjectProperty")}v+="</ObjectPropertyChain>";return v}function d(u){var v="<SubObjectPropertyOf>";if(u.arg1.type===t.OPE_CHAIN){v+=e(u.arg1)}else{if(u.arg1.type===t.ET_OPROP){v+=f(u.arg1,"ObjectProperty")}else{throw"Unknown type of the expression in the SubObjectPropertyOf axiom!"}}v+=f(u.arg2,"ObjectProperty");v+="</SubObjectPropertyOf>";return v}function a(v){var u,w=v.args,z=w.length,y,x="<EquivalentObjectProperties>";for(y=0;y<z;y+=1){u=w[y];if(u&&u.type===t.ET_OPROP){x+=f(u,"ObjectProperty")}else{throw"Unrecognized type of expression found in the arguments of the EquivalentObjectProperties axiom at the position "+y+"!"}}x+="</EquivalentObjectProperties>";return x}function i(u){return"<ObjectPropertyAssertion>"+f(u.objectProperty,"ObjectProperty")+f(u.leftIndividual,"NamedIndividual")+f(u.rightIndividual,"NamedIndividual")+"</ObjectPropertyAssertion>"}function s(u){return"<ClassAssertion>"+f(u.className,"Class")+f(u.individual,"NamedIndividual")+"<ClassAssertion>"}function h(v,u){return'<Prefix name="'+v+'" IRI="'+u+'"/>'}for(b in p){if(p.hasOwnProperty(b)){n+=h(b,p[b])}}for(m=0;m<l;m++){g=k[m];switch(g.type){case t.AXIOM_CLASS_EQ:n+=c(g,"EquivalentClasses");break;case t.AXIOM_CLASS_SUB:n+=c(g,"SubClassOf");break;case t.AXIOM_OPROP_SUB:n+=d(g);break;case t.AXIOM_OPROP_EQ:n+=a(g);break;case t.FACT_CLASS:n+=s(g);break;case t.FACT_OPROP:n+=i(g);break;default:throw"Unknown type of the axiom!"}}n+="</Ontology>";return n}};jsw.rdf.Query=function(){this.baseIri=null;this.distinctResults=false;this.limit=0;this.offset=0;this.orderBy=[];this.prefixes=[];this.reducedResults=false;this.triples=[];this.variables=[]};jsw.rdf.Query.prototype={EXPR_TYPES:{VAR:0,LITERAL:1,IRI_REF:2},addPrefix:function(a,c){var b=this.getPrefixIri(a);if(b===null){this.prefixes.push({prefixName:a,iri:c})}else{if(c!==b){throw'The prefix "'+a+'" has been defined already in the query!'}}},addTriple:function(c,a,b){this.triples.push({subject:c,predicate:a,object:b})},getPrefixIri:function(a){var d,c=this.prefixes,b=c.length-1;if(b<0){return null}do{d=c[b];if(d.prefixName===a){return d.iri.value}}while(b--);return null}};jsw.sparql={DATA_TYPES:jsw.xsd.DATA_TYPES,EXPR_TYPES:jsw.rdf.Query.prototype.EXPR_TYPES,absoluteIriRegExp:null,boolRegExp:null,decimalRegExp:null,doubleRegExp:null,intRegExp:null,iriRegExp:null,orderByValueRegExp:null,prefixedNameRegExp:null,prefixRegExp:null,rdfLiteralRegExp:null,varRegExp:null,expandPrefixedName:function(c,a,b){var d;if(!c&&!a){throw"Can not expand the given prefixed name, since both prefix and local name are empty!"}c=c||"";a=a||"";d=b.getPrefixIri(c);if(d===null){throw'Prefix "'+c+'" has not been defined in the query!'}return d+a},init:function(){var b="A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\u10000-\\uEFFFF",g=b+"_",i=g+"0-9\\-\\u00B7\\u0300-\\u036F\\u203F-\\u2040",d="(["+b+"]["+i+".]*["+i+"])?:",j="(["+g+"0-9](?:["+i+".]*["+i+"])?)?",c="[?$]["+g+"0-9]["+g+"0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*",e="'((?:[^\\x27\\x5C\\xA\\xD]|\\[tbnrf\\\"'])*)'|\"((?:[^\\x22\\x5C\\xA\\xD]|\\[tbnrf\\\"'])*)\"|\"\"\"((?:(?:\"|\"\")?(?:[^\"\\]|\\[tbnrf\\\"']))*)\"\"\"|'''((?:(?:'|'')?(?:[^'\\]|\\[tbnrf\\\"']))*)'''",a='<[^-<>"{}|^`\\][\\x00-\\x20]*>',h=d+j,f="[eE][+-]?[0-9]+";this.absoluteIriRegExp=/^<\w*:\/\//;this.boolRegExp=/^true$|^false$/i;this.intRegExp=/^(?:\+|-)?[0-9]+$/;this.decimalRegExp=/^(?:\+|-)?(?:[0-9]+\.[0-9]*|\.[0-9]+)$/;this.doubleRegExp=new RegExp("^(?:\\+|-)?(?:[0-9]+\\.[0-9]*"+f+"|\\.[0-9]+"+f+"|[0-9]+"+f+")$");this.iriRegExp=new RegExp("^"+a+"$");this.orderByValueRegExp=new RegExp("^(ASC|DESC)\\(("+c+")\\)$|^"+c+"$","i");this.prefixRegExp=new RegExp("^"+d+"$");this.prefixedNameRegExp=new RegExp("^"+h+"$");this.rdfLiteralRegExp=new RegExp("^(?:"+e+")(?:@([a-zA-Z]+(?:-[a-zA-Z0-9]+)*)|\\^\\^("+a+")|\\^\\^"+h+")?$");this.varRegExp=new RegExp("^"+c+"$")},parse:function(b){var i,e,n,h,l,m,c,k,g,f,a,d,j;if(!b){throw"The query text is not specified!"}l=new jsw.rdf.Query();k=b.split(/\s+/);g=k.length;f=0;if(k[f].toUpperCase()==="BASE"){f++;l.baseIri=this.parseAbsoluteIri(k[f]);if(l.baseIri===null){throw"BASE statement does not contain a valid IRI reference!"}f++}while(f<g){c=k[f];if(c.toUpperCase()!=="PREFIX"){break}f++;if(f===g){throw"Prefix name expected, but end of the query text found!"}h=this.parsePrefixName(k[f]);if(h===null){throw'Token "'+c+'" does not represent a valid IRI prefix!'}f++;if(f===g){throw"Prefix IRI expected, but end of the query text found!"}i=this.parseIriRef(k[f],l);if(i===null){throw"Incorrect format of the IRI encountered!"}l.addPrefix(h,i);f++}if(f===g){return l}else{if(c.toUpperCase()!=="SELECT"){throw'SELECT statement expected, but "'+c+'" was found!'}}f++;if(f===g){throw'DISTINCT/REDUCED or variable declaration expected after "SELECT", but the end of query text was found!'}c=k[f].toUpperCase();if(c==="DISTINCT"){l.distinctResults=true;f++}else{if(c==="REDUCED"){l.reducedResults=true;f++}}if(f===g){throw"Variable declarations are expected after DISTINCT/REDUCED, but the end of the query text was found!"}c=k[f];if(c==="*"){f++;c=k[f]}else{j=[];while(f<g){c=k[f];if(c.toUpperCase()==="WHERE"||c==="{"){break}d=this.parseVar(c);if(d){j.push(d)}else{throw'The token "'+c+'" does not represent the valid variable!'}f++}if(j.length===0){throw"No variable definitions found in the SELECT clause!"}l.variables=j}if(f===g){return l}else{if(c.toUpperCase()==="WHERE"){if(k[f+1]==="{"){f+=2}else{throw'WHERE clause should be surrounded with "{}"!'}}else{if(c==="{"){f++}else{throw'WHERE clause was expected, but "'+c+'" was found!'}}}a=0;while(f<g){c=k[f];if(c==="}"){if(a===0){break}else{throw"RDF triple is not complete but the end of WHERE clause was found!"}}if(a===0){m=this.parseVarOrTerm(c,l);if(m===null){throw'Subject variable or term was expected but "'+c+'" was found!'}f++;a++;if(f===g){throw"Predicate of the RDF triple expected, reached the end of text instead!"}}else{if(a===1){n=this.parseVerb(c,l);if(n===null){throw'Predicate verb was expected but "'+c+'" was found!'}f++;a++;if(f===g){throw"Object of the RDF triple expected, reached the end of text instead!"}}else{if(a===2){e=this.parseVarOrTerm(c,l);if(e===null){throw'Object variable or term was expected but "'+c+'" was found!'}l.addTriple(m,n,e);a=0;f++;switch(k[f]){case".":a=0;f++;break;case";":a=1;f++;break;case",":a=2;f++;break}}}}}if(f===g){throw'"}" expected but the end of query text found!'}f++;if(f===g){return l}if(k[f].toUpperCase()==="ORDER"){f++;c=k[f];if(c.toUpperCase()!=="BY"){throw'"BY" expected after "ORDER", but "'+c+'" was found!'}f++;while(f<g){c=k[f];if(c.toUpperCase()==="LIMIT"||c.toUpperCase()==="OFFSET"){break}d=this.parseOrderByValue(c);if(d===null){throw'Unknown token "'+c+'" was found in the ORDER BY clause!'}l.orderBy.push(d);f++}}while(f<g){c=k[f].toUpperCase();if(c==="LIMIT"){f++;if(f===g){throw'Integer expected after "LIMIT", but the end of query text found!'}c=k[f];l.limit=parseInt(c,10);if(isNaN(l.limit)){throw'Integer expected after "LIMIT", but "'+c+'" found!'}f++}else{if(c==="OFFSET"){f++;if(f===g){throw'Integer expected after "OFFSET", but the end of query text found!'}c=k[f];l.offset=parseInt(c,10);if(isNaN(l.offset)){throw'Integer expected after "OFFSET", but "'+c+'" found!'}f++}else{throw'Unexpected token "'+c+'" found!'}}}return l},parseAbsoluteIri:function(a){if(!this.iriRegExp){this.init()}if(this.iriRegExp.test(a)&&this.absoluteIriRegExp.test(a)){return a.substring(1,a.length-1)}else{return null}},parseIriRef:function(c,a){var b;if(!this.iriRegExp){this.init()}if(!this.iriRegExp.test(c)){return null}if(!a||this.absoluteIriRegExp.test(c)){b=c.substring(1,c.length-1)}else{b=a+c.substring(1,c.length-1)}return{type:this.EXPR_TYPES.IRI_REF,value:b}},parseLiteral:function(c,g){var h,b,f,a,e,d;if(!this.rdfLiteralRegExp){this.init()}f=c.match(this.rdfLiteralRegExp);if(f){for(a=1;a<=4;a++){d=f[a];if(d){break}}h=f[6]||null;if(!h){e=f[7]||"";b=f[8]||"";if(e!==""||b!==""){h=this.expandPrefixedName(e,b,g)}else{h=this.DATA_TYPES.STRING}}return{type:this.EXPR_TYPES.LITERAL,value:d,lang:f[5]||null,dataType:h}}if(this.intRegExp.test(c)){return{type:this.EXPR_TYPES.LITERAL,value:c,dataType:this.DATA_TYPES.INTEGER}}if(this.decimalRegExp.test(c)){return{type:this.EXPR_TYPES.LITERAL,value:c,dataType:this.DATA_TYPES.DECIMAL}}if(this.doubleRegExp.test(c)){return{type:this.EXPR_TYPES.LITERAL,value:c,dataType:this.DATA_TYPES.DOUBLE}}if(this.boolRegExp.test(c)){return{type:this.EXPR_TYPES.LITERAL,value:c,dataType:this.DATA_TYPES.BOOLEAN}}return null},parseOrderByValue:function(b){var a,c;if(!this.orderByValueRegExp){this.init()}a=b.match(this.orderByValueRegExp);if(a){c=a[1];if(!c){return{type:this.EXPR_TYPES.VAR,value:a[0].substring(1),order:"ASC"}}return{type:this.EXPR_TYPES.VAR,value:a[2].substring(1),order:a[1].toUpperCase()}}return null},parsePrefixedName:function(b,c){var a;if(!this.prefixedNameRegExp){this.init()}a=b.match(this.prefixedNameRegExp);if(!a){return null}return{type:this.EXPR_TYPES.IRI_REF,value:this.expandPrefixedName(a[1],a[2],c)}},parsePrefixName:function(a){if(!this.prefixRegExp){this.init()}return(this.prefixRegExp.test(a))?a.substring(0,a.length-1):null},parseVarOrTerm:function(a,c){var b=this.parseVar(a);if(b){return b}b=this.parseIriRef(a,c.baseIri);if(b){return b}b=this.parsePrefixedName(a,c);if(b){return b}b=this.parseLiteral(a,c);if(b){return b}return null},parseVar:function(a){if(this.varRegExp===null){this.init()}if(!this.varRegExp.test(a)){return null}return{type:this.EXPR_TYPES.VAR,value:a.substring(1)}},parseVerb:function(a,c){var b=this.parseVar(a);if(b){return b}b=this.parseIriRef(a,c.baseIri);if(b){return b}b=this.parsePrefixedName(a,c);if(b){return b}if(a==="a"){return{type:this.EXPR_TYPES.IRI_REF,value:jsw.rdf.IRIS.TYPE}}return null}};jsw.sql={write:function(d,u,f){var r,w,A,j,a,i,g,s,l,e,v,t,m,o,n,z,q,k,c,y,x,b,h;r="";h="";s=jsw.rdf.IRIS.TYPE;z=jsw.rdf.Query.prototype.EXPR_TYPES;x={};function p(G,D,F){var C=G.type,E=G.value,B;if(C===z.IRI_REF){h+=D+"."+F+"=='"+E+"' AND "}else{if(C===z.VAR){B=x[E];if(B){h+=D+"."+F+"=="+B+" AND "}else{x[E]=D+"."+F}}else{if(C===z.LITERAL){throw"Literal expressions in RDF queries are not supported by the library yet!"}else{throw"Unknown type of expression found in the RDF query: "+subjectType+"!"}}}}m=d.triples;o=m.length;for(n=0;n<o;n++){t=m[n];a=t.predicate;i=a.type;g=a.value;e="leftIndividual";A="rightIndividual";v="t"+n;if(i===z.IRI_REF){if(g===s){r+=u+" AS "+v+", ";e="individual";A="className"}else{r+=f+" AS "+v+", ";h+=v+".objectProperty=='"+g+"' AND "}}else{if(i===z.VAR){r+=f+" AS "+v+", ";y=x[g];if(y){h+=v+".objectProperty=="+y+" AND "}else{x[g]=v+".objectProperty"}}else{throw"Unknown type of a predicate expression: "+i+"!"}}p(t.subject,v,e);p(t.object,v,A)}if(o>0){r=" FROM "+r.substring(0,r.length-2)}if(h.length>0){h=" WHERE "+h.substring(0,h.length-5)}l="";k=d.variables;c=k.length;if(c>0){for(b=0;b<c;b++){q=k[b].value;y=x[q];if(y){l+=y+" AS "+q+", "}else{l+="'' AS "+q+", "}}}else{for(q in x){if(x.hasOwnProperty(q)){l+=x[q]+" AS "+q+", "}}}if(l.length>0){l=l.substring(0,l.length-2)}else{throw"The given RDF query is in the wrong format!"}if(d.distinctResults){l="SELECT DISTINCT "+l}else{l="SELECT "+l}j="";k=d.orderBy;c=k.length;for(b=0;b<c;b++){q=k[b];if(q.type!=z.VAR){throw"Unknown type of expression found in ORDER BY: "+q.type+"!"}j+=q.value+" "+q.order+", "}if(c>0){j=" ORDER BY "+j.substring(0,j.length-2)}w="";if(d.limit!==0){w=" LIMIT "+d.limit;if(d.offset!==0){w+=", "+d.offset}}else{if(d.offset!==0){w=" LIMIT 0, "+d.offset}}return l+r+h+j+w}};jsw.owl.Reasoner=function(d){var c,b,a;this.timeInfo={};this.originalOntology=d;this.classSubsumers=null;this.aBox=null;c=new jsw.util.Stopwatch();c.start();b=this.normalizeOntology(d);this.timeInfo.normalization=c.stop();c.start();a=this.buildObjectPropertySubsumerSets(b);this.timeInfo.objectPropertySubsumption=c.stop();c.start();this.classSubsumers=this.buildClassSubsumerSets(b,a);this.timeInfo.classification=c.stop();c.start();this.aBox=this.rewriteAbox(b,a);this.timeInfo.aBoxRewriting=c.stop()};jsw.owl.Reasoner.prototype={queryLang:TrimPath.makeQueryLang({ClassAssertion:{individual:{type:"String"},className:{type:"String"}},ObjectPropertyAssertion:{objectProperty:{type:"String"},leftIndividual:{type:"String"},rightIndividual:{type:"String"}}}),buildObjectPropertySubsumerSets:function(i){var k,d,l,f,j,g,c,e,a,h,b,m;c=new jsw.util.PairStorage();j=i.getObjectProperties();for(g in j){if(j.hasOwnProperty(g)){c.add(g,g)}}d=i.axioms;l=d.length-1;if(l<0){return c}f=jsw.owl.EXPRESSION_TYPES;e=f.ET_OPROP;a=f.AXIOM_OPROP_SUB;do{k=d[l];if(k.type!==a||k.arg1.type!==e){continue}c.add(k.arg1.IRI,k.arg2.IRI)}while(l--);h=new jsw.util.Queue();for(g in j){if(!j.hasOwnProperty(g)){continue}m=c.get(g);for(b in m){if(m.hasOwnProperty(b)){h.enqueue(b)}}while(!h.isEmpty()){m=c.get(h.dequeue());for(b in m){if(m.hasOwnProperty(b)){if(!c.exists(g,b)){c.add(g,b);h.enqueue(b)}}}}}return c},buildClassSubsumerSets:function(k,a){var l=k.axioms,n=l.length,v=this.buildChainSubsumerSets(k),w=new jsw.util.PairStorage(),c=new jsw.util.TripletStorage(),y=jsw.owl.EXPRESSION_TYPES,t,j=v.left,p,q,s={},u=v.right,e;function x(B,E){var D,C,z,A;if(B.type!==y.AXIOM_CLASS_SUB){return false}z=B.args[0];A=z.type;if(A===y.ET_CLASS&&z.IRI===E){return true}else{if(A!==y.CE_INTERSECT){return false}}D=z.args;C=D.length-1;do{if(D[C].IRI===E){return true}}while(C--);return false}function h(I,G){var F,D,E,K,C,L,A,B,H,J,z;H=y.CE_INTERSECT;D=l;K=n-1;do{F=D[K];if(!x(F,I)){continue}z=null;E=F.args;B=E[0];if(B.type===H){C=B.args;L=C.length-1;J=L-1;z={};do{A=C[L].IRI;if(A!==I){z[A]=true}}while(L--)}s[G].enqueue({type:0,node:G,label:E[1].IRI,reqLabels:z})}while(K--)}function m(A,L,J){var G,H,I,M,E,C,D,F,B,z,K;C=y.ET_CLASS;B=y.ET_OPROP;z=y.AXIOM_CLASS_SUB;K=y.CE_OBJ_VALUES_FROM;G=l;M=n-1;do{I=G[M];if(I.type!==z){continue}H=I.args;D=H[0];if(!D||D.type!==K){continue}F=D.opropExpr;E=D.classExpr;if(F.type===B&&F.IRI===A&&E.type===C&&E.IRI===L){s[J].enqueue({type:0,node:J,label:H[1].IRI})}}while(M--)}function r(I,G){var C,D,F,J,A,B,z,H,E;A=y.ET_CLASS;z=y.AXIOM_CLASS_SUB;H=y.CE_OBJ_VALUES_FROM;C=l;J=n-1;do{F=C[J];if(!F.args){continue}D=F.args;B=D[0];E=D[1];if(F.type!==z||!B||B.type!==A||B.IRI!==I||!E||E.type!==H){continue}s[G].enqueue({type:1,node1:G,node2:E.classExpr.IRI,label:E.opropExpr.IRI})}while(J--)}function d(A,z){h(A,z);r(A,z)}function b(z){w.add(z,z);s[z]=new jsw.util.Queue();d(z,z)}function o(){var A=k.getClasses(),B,z=jsw.owl.IRIS.THING;b(z);for(B in A){if(A.hasOwnProperty(B)){b(B);w.add(B,z);d(z,B)}}}function g(J,H,B){var D,G,C,E,F,A,z,I,K;C=w.get();E=c;D=w.get(H);F=j;I=u;for(A in a.get(B)){E.add(J,H,A);for(G in D){m(A,G,J)}for(z in I.get(A)){for(K in I.get(A,z)){for(G in C){if(E.exists(G,J,z)&&!E.exists(G,H,K)){g(G,H,K)}}}}for(z in F.get(A)){for(K in F.get(A,z)){for(G in C){if(E.exists(H,G,z)&&!E.exists(J,G,K)){g(J,G,K)}}}}}}function f(A){var C=A.label,B=A.node1,z=A.node2;if(c.exists(B,z,C)){g(B,z,C)}}function i(A){var B,z,F,C,E,D;B=A.node;z=A.label;C=c;D=w;if(D.exists(B,z)||!D.existAll(B,A.reqLabels)){return}D.add(B,z);h(z,B);for(F in C.get()){for(E in C.get(F,B)){m(E,z,F)}}}o();do{e=false;for(p in s){q=s[p];if(!q.isEmpty()){t=q.dequeue();switch(t.type){case 0:i(t);break;case 1:f(t);break;default:throw"Unrecognized type of instruction found in the queue!"}e=true;break}}}while(e);return w},buildChainSubsumerSets:function(i){var j,k,d,l,m,f,e,h,c,b,a,g;d=i.axioms;l=d.length-1;e=new jsw.util.TripletStorage();g=new jsw.util.TripletStorage();if(l<0){return{left:e,right:g}}f=jsw.owl.EXPRESSION_TYPES;b=f.AXIOM_OPROP_SUB;c=f.OPE_CHAIN;do{k=d[l];if(k.type!==b||k.arg1.type!==c){continue}j=k.arg1.args;h=j[0].IRI;a=j[1].IRI;m=k.arg2.IRI;e.add(h,a,m);g.add(a,h,m)}while(l--);return{left:e,right:g}},rewriteAbox:function(e,a){var b=e.axioms,c=jsw.owl.EXPRESSION_TYPES,i=b.length-1,f=this.originalOntology,g=this;function d(){var r,p,q,n,l,k,j,o,m;if(i<0){return[]}q=i;k=new jsw.util.PairStorage();m=g.classSubsumers;n=c.FACT_CLASS;do{p=b[q];if(p.type!==n){continue}j=p.individual.IRI;l=p.classExpr.IRI;for(o in m.get(l)){if(f.containsClass(o)){k.add(j,o)}}}while(q--);r=[];for(j in k.get()){for(l in k.get(j)){r.push({individual:j,className:l})}}return r}function h(){var m,j,o,r,n,q,u,k,w,z,s,l,p,v,y,A,t,x;if(i<0){return[]}t=a;x=new jsw.util.TripletStorage();l=c.FACT_OPROP;r=i;do{o=b[r];if(o.type!==l){continue}w=o.leftIndividual.IRI;y=o.rightIndividual.IRI;s=o.objectProperty.IRI;for(k in t.get(s)){x.add(k,w,y)}}while(r--);p=c.AXIOM_OPROP_SUB;v=c.OPE_CHAIN;do{u=false;r=i;do{o=e.axioms[r];if(o.type!==p||o.arg1.type!==v){continue}m=o.arg1.args;z=m[0].IRI;A=m[1].IRI;q=o.arg2.IRI;for(w in x.get(z)){for(n in x.get(z,w)){for(y in x.get(A,n)){for(k in t.get(q)){if(!x.exists(k,w,y)){x.add(k,w,y);u=true}}}}}}while(r--)}while(u);j=[];for(s in x.get()){if(!f.containsObjectProperty(s)){continue}for(w in x.get(s)){for(y in x.get(s,w)){j.push({objectProperty:s,leftIndividual:w,rightIndividual:y})}}}return j}return{ClassAssertion:d(),ObjectPropertyAssertion:h()}},isSubclass:function(b,a){var c=this.originalOntology.getClasses();if(!c[b]){throw"The ontology does not contain a class '"+b+"'"}if(!c[a]){throw"The ontology does not contain a class '"+a+"'"}return this.classSubsumers.exists(b,a)},answerQuery:function(a){var b;if(!a){throw"The query is not specified!"}b=jsw.sql.write(a,"ClassAssertion","ObjectPropertyAssertion");return this.queryLang.parseSQL(b).filter(this.aBox)},normalizeOntology:function(h){var j,c,k,i,g,e,b,a,l,f;function d(){var p,m,n,o;p=h.entities;for(o in p){if(p.hasOwnProperty(o)){m=p[o];for(n in m){if(m.hasOwnProperty(n)){a.entities[o][n]=m[n]}}}}}c=h.axioms;e=jsw.owl.EXPRESSION_TYPES;a=new jsw.owl.Ontology();l=[function(u){var s,t,v,n,r,p,o,m,q;n=e.OPE_CHAIN;m=e.AXIOM_OPROP_SUB;if(u.type!==m||u.arg1.type!==n||u.arg1.args.length<=2){return null}p=e.ET_OPROP;o=a.createEntity(p);q=u.arg1.args;v=[{type:m,arg1:{type:n,args:[q[0],q[1]]},arg2:o}];s=q.length-1;for(r=2;r<s;r++){t=a.createEntity(p);v.push({type:m,arg1:{type:n,args:[o,q[r]]},arg2:t});o=t}v.push({type:m,arg1:{type:n,args:[o,q[s]]},arg2:u.arg2});return v},function(o){var q,p,n,m,t,s,r;if(o.type===e.AXIOM_CLASS_EQ){r=e.AXIOM_CLASS_SUB}else{if(o.type===e.AXIOM_OPROP_EQ){r=e.AXIOM_OPROP_SUB}else{return null}}q=o.args;t=q.length-1;if(t<0){throw"Equivalence axiom has no arguments!"}s=[];p=t;do{m=q[p];n=t;do{if(p!==n){s.push({type:r,args:[m,q[n]]})}}while(n--)}while(p--);return s},function(p){var r,n,m,q,o;o=e.AXIOM_CLASS_SUB;if(p.type!==o||p.args[1].type!==e.CE_INTERSECT){return null}r=p.args[1].args;n=r.length-1;if(n<0){throw"Class Intersection expression has no arguments!"}q=[];m=p.args[0];do{q.push({type:o,args:[m,r[n]]})}while(n--);return q},function(n){var p,o,m;p=e.ET_CLASS;m=e.AXIOM_CLASS_SUB;if(n.type!==m||n.args[0].type===p||n.args[1].type===p){return null}o=a.createEntity(p);return[{type:m,args:[n.args[0],o]},{type:m,args:[o,n.args[1]]}]},function(s){var r,p,o,n,q,w,v,m,t,u;m=e.AXIOM_CLASS_SUB;t=e.CE_INTERSECT;n=e.ET_CLASS;if(s.type!==m||s.args[0].type!==t){return null}r=s.args[0].args;p=r.length-1;if(p<0){throw"Class Intersection expression has no arguments!"}v=[];w=[];u=false;do{o=r[p];if(o.type!==n){u=true;q=a.createEntity(n);v.push({type:m,args:[q,o]});w.push(q)}else{w.push(o)}}while(p--);if(u){v.push({type:m,args:[{type:t,args:w},s.args[1]]});return v}else{return null}},function(p){var m,r,q,n,o,s;r=e.ET_CLASS;o=e.AXIOM_CLASS_SUB;s=e.CE_OBJ_VALUES_FROM;if(p.type!==o||p.args[0].type!==s||p.args[0].classExpr.type===r){return null}m=p.args[0];q=a.createEntity(r);n={type:s,opropExpr:m.opropExpr,classExpr:q};return[{type:o,args:[m.classExpr,q]},{type:o,args:[n,p.args[1]]}]},function(n){var q,p,m,r,o;q=e.ET_CLASS;m=e.AXIOM_CLASS_SUB;r=e.CE_OBJ_VALUES_FROM;if(n.type!==m||n.args[1].type!==r||n.args[1].classExpr.type===q){return null}o=n.args[1];p=a.createEntity(q);return[{type:m,args:[o.classExpr,p]},{type:m,args:[n.args[0],{type:r,opropExpr:o.opropExpr,classExpr:p}]}]},function(n){var o,p,m;o=e.ET_CLASS;m=e.FACT_CLASS;if(n.type!==m||n.classExpr.type===o){return null}p=a.createEntity(o);return[{type:e.AXIOM_CLASS_SUB,args:[p,n.classExpr]},{type:m,individual:n.individual,classExpr:p}]}];d();k=c.length-1;if(k<0){return a}g=new jsw.util.Queue();do{g.enqueue(c[k])}while(k--);i=l.length-1;while(!g.isEmpty()){j=g.dequeue();f=i;do{b=l[f](j);if(b){k=b.length-1;do{g.enqueue(b[k])}while(k--);break}}while(f--);if(f<0){a.axioms.push(j)}}return a}};jsw.owl.Ontology=function(){var b=jsw.owl.EXPRESSION_TYPES,d=b.ET_CLASS,c=b.ET_INDIVIDUAL,a=b.ET_OPROP;this.entities={};this.entities[a]={};this.entities[d]={};this.entities[c]={};this.axioms=[];this.prefixes={};this.nextEntityNos={};this.nextEntityNos[a]=1;this.nextEntityNos[d]=1;this.nextEntityNos[c]=1;this.entityCount={};this.entityCount[a]=0;this.entityCount[d]=0;this.entityCount[c]=0};jsw.owl.Ontology.prototype={exprTypes:jsw.owl.EXPRESSION_TYPES,addPrefix:function(a,c){var b=this.prefixes[a];if(!b){this.prefixes[a]=c}else{if(b!==c){throw'The prefix with the name "'+a+'" and different IRI "'+b+'" has already been added to the ontology!'}}},createNewIRI:function(a){var d,c=this.getEntityAutoPrefix(a),b=this.nextEntityNos[a],e;if(!b){throw"Unrecognized entity type!"}d=this.entities[a];e="";do{e=c+b;b++}while(d[e]);this.nextEntityNos[a]=b;return e},createEntity:function(b,c){var a;if(!c){c=this.createNewIRI(b)}else{if(this.entities[b][c]){return this.entities[b][c]}}a={type:b,IRI:c};this.entities[b][c]=a;this.entityCount[b]++;return a},containsClass:function(a){if(this.entities[this.exprTypes.ET_CLASS][a]){return true}else{return false}},containsObjectProperty:function(a){if(this.entities[this.exprTypes.ET_OPROP][a]){return true}else{return false}},getClassCount:function(){return this.entityCount[this.exprTypes.ET_CLASS]},getClasses:function(){return this.entities[this.exprTypes.ET_CLASS]},getEntityAutoPrefix:function(b){var a=this.exprTypes;switch(b){case a.ET_CLASS:return"C_";case a.ET_OPROP:return"OP_";case a.ET_INDIVIDUAL:return"I_";default:throw'Unknown entity type "'+b+'"!'}},getObjectPropertyCount:function(){return this.entityCount[this.exprTypes.ET_OPROP]},getObjectProperties:function(){return this.entities[this.exprTypes.ET_OPROP]},getIndividualCount:function(){return this.entityCount[this.exprTypes.ET_INDIVIDUAL]},getIndividuals:function(){return this.entities[this.exprTypes.ET_INDIVIDUAL]},getSize:function(f){var c,b,g,a,e,d;b=this.axioms;g=b.length-1;if(!f||g<0){return g+1}a=f.length-1;e=0;do{c=b[g];d=a;do{if(c.type===f[d]){e++;break}}while(d--)}while(g--);return e},getAboxSize:function(){var a=this.exprTypes;return this.getSize([a.FACT_CLASS,a.FACT_OPROP])},getTboxSize:function(){var a=this.exprTypes;return this.getSize([a.AXIOM_CLASS_EQ,a.AXIOM_CLASS_SUB,a.AXIOM_OPROP_SUB])},getRboxSize:function(){return this.getSize([this.exprTypes.AXIOM_OPROP_SUB])}};jsw.util.xml={parseString:function(b){var c,a;if(window.DOMParser){c=new DOMParser().parseFromString(b,"text/xml");if(c.documentElement.nodeName==="parsererror"){throw c.documentElement.childNodes[0].nodeValue}else{if(c.documentElement.childNodes[0]&&c.documentElement.childNodes[0].childNodes[0]&&c.documentElement.childNodes[0].childNodes[0].nodeName==="parsererror"){throw c.documentElement.childNodes[0].childNodes[0].childNodes[1].innerText}}return c}else{c=new ActiveXObject("Microsoft.XMLDOM");c.async="false";c.loadXML(b);a=c.parseError;if(a.errorCode!==0){throw"Can not parse the given onotology OWL/XML:\nError in line "+a.line+" position "+a.linePos+"\nError Reason: "+a.reason}}return c}};jsw.util.Queue=function(){this.queue=[];this.emptyElements=0};jsw.util.Queue.prototype={isEmpty:function(){return this.queue.length===0},enqueue:function(a){this.queue.push(a)},dequeue:function(){var c,b=this.emptyElements,a=this.queue,d=a.length;if(d===0){return null}c=a[b];b++;if(b<<1>=d-1){this.queue=a.slice(b);this.emptyElements=0}else{this.emptyElements=b}return c}};jsw.util.Stopwatch=function(){var b,a=null;this.getElapsedTimeAsText=function(){var e=a%1000,c=Math.floor(a/3600000),d=Math.floor(a%3600000/60000),f=Math.floor(a%60000/1000);if(e<10){e="00"+e.toString()}else{if(e<100){e="0"+e.toString()}}return c+" : "+d+" : "+f+"."+e};this.start=function(){b=new Date().getTime();a=null};this.stop=function(){a=new Date().getTime()-b;return this.getElapsedTimeAsText()}};jsw.util.PairStorage=function(){this.storage={}};jsw.util.PairStorage.prototype={get:function(a){if(!a){return this.storage}return this.storage[a]||{}},exists:function(c,a){var b=this.storage[c];if(!b){return false}return b[a]||false},existAll:function(b,a){var d,c;if(!a){return true}d=this.storage[b];if(!d){return false}for(c in a){if(!d[c]){return false}}return true},add:function(b,a){var c=this.storage;if(!c[b]){c[b]={}}c[b][a]=true}};jsw.util.TripletStorage=function(){this.storage={}};jsw.util.TripletStorage.prototype={get:function(c,a){var b;if(!c){return this.storage}b=this.storage[c];if(!b){return{}}if(!a){return b}return b[a]||{}},add:function(c,b,a){var d=this.storage;if(!d[c]){d[c]={}}if(!d[c][b]){d[c][b]={}}d[c][b][a]=true},exists:function(e,c,b){var f=this.storage,a=f[e],d;if(!a){return false}d=a[c];if(!d){return false}if(!d[b]){return false}return true}};