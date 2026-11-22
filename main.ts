// tiny-stack-vm-01
import {readdirSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const IM=new Uint8Array(256),PO=new Uint8Array(256),PU=new Uint8Array(256);
const g=(a,i,o,u)=>{for(const x of a){IM[x]=i+1;PO[x]=o;PU[x]=u}};
g([0,52],0,0,0);g([1],1,0,1);g([2],4,0,1);g([3,80,81,83],0,1,0);g([4],0,1,2);g([5],0,2,2);g([6],0,2,3);g([7],0,3,3);
g([16,17,18,19,20,21,22],0,2,1);g([24,25,26,28,29,30,32,33,34],0,2,1);g([23,27,64],0,1,1);g([65],0,2,0);
g([82],0,0,1);g([48,51],2,0,0);g([49,50],2,1,0);
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
function run(p,inp){
const n=p.length;M.fill(0);
let sp=0,cs=0,ol=0,ip=0,pc=0,st=0;
const R=c=>[O.slice(0,ol),c];
for(;;){
if(st===1e6)return R(10);
if(pc>>>0>=n)return R(9);
const o=p[pc],im=IM[o]-1;
if(im<0)return R(5);
if(pc+im>=n)return R(9);
st++;
const nx=pc+1+im,po=PO[o],pu=PU[o];
if(sp<po)return R(2);
if(sp-po+pu>256)return R(3);
pc=nx;
switch(o){
case 0:return R(0);
case 1:D[sp]=p[nx-1]<<24>>24;break;
case 2:D[sp]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:break;
case 4:D[sp]=D[sp-1];break;
case 5:{const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t;break}
case 6:D[sp]=D[sp-2];break;
case 7:{const t=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=t;break}
case 16:D[sp-2]=D[sp-2]+D[sp-1]|0;break;
case 17:D[sp-2]=D[sp-2]-D[sp-1]|0;break;
case 18:D[sp-2]=Math.imul(D[sp-2],D[sp-1]);break;
case 19:{const a=D[sp-2],b=D[sp-1];if(!b)return R(4);D[sp-2]=a===-2147483648&&b===-1?a:a/b|0;break}
case 20:{const b=D[sp-1];if(!b)return R(4);D[sp-2]=b===-1?0:D[sp-2]%b|0;break}
case 21:{const b=D[sp-1];if(!b)return R(4);D[sp-2]=Math.floor((D[sp-2]>>>0)/(b>>>0))|0;break}
case 22:{const b=D[sp-1];if(!b)return R(4);D[sp-2]=(D[sp-2]>>>0)%(b>>>0)|0;break}
case 23:D[sp-1]=-D[sp-1]|0;break;
case 24:D[sp-2]&=D[sp-1];break;
case 25:D[sp-2]|=D[sp-1];break;
case 26:D[sp-2]^=D[sp-1];break;
case 27:D[sp-1]=~D[sp-1];break;
case 28:D[sp-2]<<=D[sp-1]&31;break;
case 29:D[sp-2]>>=D[sp-1]&31;break;
case 30:D[sp-2]>>>=D[sp-1]&31;break;
case 32:D[sp-2]=+(D[sp-2]===D[sp-1]);break;
case 33:D[sp-2]=+(D[sp-2]<D[sp-1]);break;
case 34:D[sp-2]=+(D[sp-2]>>>0<D[sp-1]>>>0);break;
case 48:case 49:case 50:{const r=(p[nx-2]|p[nx-1]<<8)<<16>>16;let t=true;if(o!==48){const v=D[sp-1];t=o===49?v===0:v!==0}if(t)pc=nx+r;break}
case 51:if(cs===64)return R(7);C[cs++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
case 52:if(!cs)return R(8);pc=C[--cs];break;
case 64:{const a=D[sp-1];if(a>>>0>255)return R(6);D[sp-1]=M[a];break}
case 65:{const a=D[sp-1];if(a>>>0>255)return R(6);M[a]=D[sp-2];break}
case 80:{const s=''+D[sp-1],l=s.length;if(ol+l>65536)return R(11);let i=0;while(i<l)O[ol++]=s.charCodeAt(i++);break}
case 81:if(ol===65536)return R(11);O[ol++]=D[sp-1]&255;break;
case 82:D[sp]=ip<inp.length?inp[ip++]:-1;break;
case 83:return R(D[sp-1]&255);
}
sp+=pu-po;
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',OU=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I,{withFileTypes:true}).filter(e=>e.isDirectory()).map(e=>e.name).sort()){
const q=run(readFileSync(I+'/'+id+'/program.bin'),readFileSync(I+'/'+id+'/input.bin'));
mkdirSync(OU+'/'+id,{recursive:true});
writeFileSync(OU+'/'+id+'/stdout.bin',q[0]);
writeFileSync(OU+'/'+id+'/exit.txt',q[1]+'\n');
}
