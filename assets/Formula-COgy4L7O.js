import{f,_ as s,r as p,o as c,g as _,w,d as e}from"./app-BBrdnoZJ.js";const F=f({__name:"Formula",setup(u,{expose:n}){n();const t={tableData:[{group:"技能",nrJ:"技能×技能/400+技能/2",nrA:"技能/2",df:"技能×1.5+30（夜×1.3）",wddM:"  (技能×1.5+20) ×2",eddN:"  技能×1.5+20)",pt:"技能×3+50"},{group:"敏捷",nrJ:"敏捷×0.5",nrA:"敏捷×0.3",df:"敏捷×0.35",wddM:"敏捷×0.7",eddN:"敏捷×0.7",pt:"敏捷×0.7"},{group:"装备伤害",nrJ:"装备伤害×0.18",nrA:"暗器命中+50",df:"装备伤害×0.15",wddM:"(装备伤害/8)×2",eddN:"装备伤害/8",pt:"武器伤害×0.24"},{group:"装备固伤",nrJ:"装备固伤×0.83",nrA:"装备固伤×0.8",df:"装备固伤×0.5",wddM:"装备固伤",eddN:"装备固伤",pt:"装备固伤"},{group:"符石组合",nrJ:"",nrA:"",df:"12%，16%，25%",wddM:"25%，33%，50%",eddN:"25%，33%，50%",pt:"25%，33%，50%"},{group:"暗器/金刚杵",nrJ:"暗器×暗器/150+暗器",nrA:"暗器×暗器/150+暗器",df:"",wddM:"",eddN:"",pt:""},{group:"分灵/聚伤",nrJ:"副秒衰减至0.6-1倍，   天阵1.25倍，分灵与阵法相乘取两位小数",nrA:"副秒衰减至0.6-1倍，   天阵1.25倍，分灵与阵法相乘取两位小数",df:"主秒增加1-1.6倍",wddM:"副秒衰减至0.6-1倍",eddN:"副秒衰减至0.6-1倍",pt:"副秒衰减至0.55-1倍"},{group:"阵法",nrJ:"",nrA:"",df:"天阵1.15倍",wddM:"天阵1.15倍",eddN:"天阵1.15倍",pt:"天阵1.15倍"},{group:"固伤符石",nrJ:"每颗2点固伤",nrA:"每颗2点固伤",df:"每颗2点固伤",wddM:"每颗2点固伤",eddN:"每颗2点固伤",pt:"每颗2点固伤"},{group:"法修",nrJ:"1+(法修-目标法抗)×2%",nrA:"1+(法修-目标法抗)×2%",df:"1+(法修-目标法抗)×2%",wddM:"1+(法修-目标法抗)×2%",eddN:"1+(法修-目标法抗)×2%",pt:"1+(法修-目标法抗)×2%"},{group:"",nrJ:"(法修-目标法抗)×5",nrA:"(法修-目标法抗)×5",df:"(法修-目标法抗)×5",wddM:"(法修-目标法抗)×5",eddN:"(法修-目标法抗)×5",pt:"(法修-目标法抗)×5"},{group:"无底洞奶脉",nrJ:"",nrA:"",df:"",wddM:"",eddN:"以上结果乘以0.7倍",pt:""},{group:"神木符",nrJ:"打多少加多少",nrA:"打多少加多少",df:"打多少加多少",wddM:"打多少加多少",eddN:"打多少加多少",pt:"打多少加多少"},{group:"装备伤害",nrJ:"主秒：额外伤害×0.5",nrA:"主秒：额外伤害×0.5",df:"主秒：额外伤害×0.5",wddM:"主秒：额外伤害×0.5",eddN:"主秒：额外伤害×0.5",pt:"主秒：额外伤害×0.5"},{group:"符石组合",nrJ:"20%，30%，40%",nrA:"20%，30%，40%",df:"",wddM:"",eddN:"",pt:""},{group:"帮派秘宝",nrJ:"×(1+帮派秘宝)",nrA:"×(1+帮派秘宝)",df:"×(1+帮派秘宝)",wddM:"×(1+帮派秘宝)",eddN:"×(1+帮派秘宝)",pt:"×(1+帮派秘宝)"}],cellStyle:({columnIndex:o})=>{if(o===0)return{fontSize:"16px",fontWeight:"bold"}}};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}});function i(u,n,l,r,t,o){const d=p("el-table-column"),a=p("el-table");return c(),_(a,{class:"custom-table",data:r.tableData,stripe:"",border:!0,size:"large","header-row-style":{fontSize:"16px"},"cell-style":r.cellStyle},{default:w(()=>[e(d,{fixed:"",prop:"group",label:"",width:"130"}),e(d,{prop:"nrJ",label:"女儿（技能）",width:"200"}),e(d,{prop:"nrA",label:"女儿（暗器）",width:"200"}),e(d,{prop:"df",label:"地府（白天）",width:"200"}),e(d,{prop:"wddM",label:"无底洞（秒）",width:"200"}),e(d,{prop:"eddN",label:"无底洞（奶）",width:"200"}),e(d,{prop:"pt",label:"普陀",width:"200"})]),_:1})}const b=s(F,[["render",i],["__file","Formula.vue"]]);export{b as default};