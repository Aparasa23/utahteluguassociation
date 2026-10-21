'use client';
import React,{useEffect,useMemo,useRef,useState} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import * as THREE from 'three';

function Stone({position,size,color='#b48b65'}:{position:[number,number,number];size:[number,number,number];color?:string}){
 return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.87} metalness={.03}/></mesh>
}
function Column({x,z}:{x:number;z:number}){return <group position={[x,0,z]}>
 <Stone position={[0,-.85,0]} size={[.78,.35,.79]} color="#8c6653"/>
 <Stone position={[0,.9,0]} size={[.56,3.4,.56]} color="#d6aa7c"/>
 {[-.5,2.42].map(y=><group key={y}><Stone position={[0,y,0]} size={[.84,.2,.86]} color="#e0ba8f"/><Stone position={[0,y+.19,0]} size={[.68,.14,.7]} color="#aa7b5a"/></group>)}
 </group>}
function Diya({x,z,scale=1}:{x:number;z:number;scale?:number}){const flame=useRef<THREE.Mesh>(null);
 useFrame(({clock})=>{if(flame.current){flame.current.scale.y=1+Math.sin(clock.elapsedTime*3+x*2)*.13}});
 return <group position={[x,-1.08,z]} scale={scale}>
 <mesh><cylinderGeometry args={[.22,.13,.14,12]}/><meshStandardMaterial color="#b47036" metalness={.6} roughness={.32}/></mesh>
 <mesh position={[0,.26,0]} ref={flame}><sphereGeometry args={[.09,.23,9,12]}/><meshBasicMaterial color="#ffbb48"/></mesh>
 <pointLight position={[0,.38,0]} color="#ffb45d" intensity={1.1} distance={2.4}/>
 </group>}
function Garlands(){const swags=useMemo(()=>Array.from({length:5},(_,j)=>Array.from({length:17},(_,i)=>{const t=i/16;return [(-5+j*2.5)+(t*2.5),3.62-Math.sin(t*Math.PI)*.56,-2.85] as [number,number,number]})),[]);
 return <group>{swags.map((swag,j)=>swag.map((p,i)=><mesh key={j+'-'+i} position={p} scale={i%3===0?1.2:1}><sphereGeometry args={[.12,7,7]}/><meshStandardMaterial color={i%4===0?'#f7e0a1':i%2===0?'#da7d29':'#e9b34d'} roughness={1}/></mesh>))}</group>}
function Rangoli(){return <group position={[0,-1.075,1.5]}>
 <mesh rotation={[-Math.PI/2,0,0]}><circleGeometry args={[2.15,64]}/><meshStandardMaterial color="#5d2841" side={THREE.DoubleSide}/></mesh>
 {[.55,1,1.55,2.04].map((r,i)=><mesh key={i} rotation={[-Math.PI/2,0,0]} position={[0,.013+i*.003,0]}><ringGeometry args={[r,r+.07,96]}/><meshStandardMaterial color={i%2===0?'#f5cf69':'#faf0d6'} side={THREE.DoubleSide} roughness={1}/></mesh>)}
 {Array.from({length:16},(_,i)=>{const angle=i*Math.PI/8;return <mesh key={i} rotation={[-Math.PI/2,0,-angle]} position={[Math.cos(angle)*1.34,.027,Math.sin(angle)*1.34]}><circleGeometry args={[.33,4]}/><meshStandardMaterial color={i%2?'#f1a635':'#d65d4b'} side={THREE.DoubleSide}/></mesh>})}
 {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <Diya key={i} x={Math.cos(a)*2.5} z={Math.sin(a)*2.5+1.5} scale={.75}/>})}
 </group>}
function Petals(){const petals=useRef<THREE.InstancedMesh>(null);
 const originals=useMemo(()=>Array.from({length:65},(_,i)=>({x:(i*19.17%13)-6.5,y:((i*11.37)%5)+.2,z:-2+(i*7.73%8),v:.15+(i%5)*.025})),[]);
 const object=useMemo(()=>new THREE.Object3D(),[]);
 useFrame(({clock})=>{const mesh=petals.current;if(!mesh)return;originals.forEach((p,i)=>{object.position.set(p.x+Math.sin(clock.elapsedTime*.43+i)*.33,((p.y-clock.elapsedTime*p.v)%6+6)%6-1.5,p.z);object.rotation.set(clock.elapsedTime*.3+i,clock.elapsedTime*.15+i*.5,.3);object.scale.set(.07,.025,.11);object.updateMatrix();mesh.setMatrixAt(i,object.matrix)});mesh.instanceMatrix.needsUpdate=true});
 return <instancedMesh ref={petals} args={[undefined,undefined,originals.length]} frustumCulled={false}><planeGeometry args={[1,1]}/><meshStandardMaterial color="#e9a848" side={THREE.DoubleSide} transparent opacity={.87}/></instancedMesh>}

// The mandapa is built from individual architectural forms rather than
// flat background gradients. All shapes are procedural: no licensed assets.
function TurnedColumn({x,z}:{x:number;z:number}){
 return <group position={[x,0,z]}>
 <mesh position={[0,-.88,0]}><cylinderGeometry args={[.55,.66,.25,12]}/><meshStandardMaterial color="#a57959" roughness={.92}/></mesh>
 <mesh position={[0,-.54,0]}><cylinderGeometry args={[.43,.53,.49,12]}/><meshStandardMaterial color="#d2a177" roughness={.84}/></mesh>
 <mesh position={[0,.95,0]}><cylinderGeometry args={[.29,.35,2.5,16]}/><meshStandardMaterial color="#d7ac82" roughness={.82}/></mesh>
 {[.0,.34,1.85,2.14].map((y,i)=><mesh key={y} position={[0,y,0]}><cylinderGeometry args={[.46-(i%2)*.06,.5-(i%2)*.06,.17,16]}/><meshStandardMaterial color={i%2?'#d2a177':'#b98661'} roughness={.88}/></mesh>)}
 <mesh position={[0,2.37,0]}><cylinderGeometry args={[.58,.39,.35,12]}/><meshStandardMaterial color="#b98765" roughness={.9}/></mesh>
 </group>
}
function FestivalMandapa(){return <group position={[0,0,-3.7]}>
 <Stone position={[0,-.5,0]} size={[14,1,5.3]} color="#a98164"/>
 <Stone position={[0,.01,-1.1]} size={[12,.75,2.3]} color="#674e49"/>
 {[-5.1,-2.55,0,2.55,5.1].map(x=><TurnedColumn key={x} x={x} z={.95}/>)}
 <Stone position={[0,2.71,.88]} size={[12.6,.44,1.7]} color="#bc8a62"/>
 <Stone position={[0,3.08,.85]} size={[13,.2,2]} color="#e5b98a"/>
 <mesh rotation={[0,0,Math.PI/2]} position={[0,3.25,.85]}><cylinderGeometry args={[.18,.18,13.6,12]}/><meshStandardMaterial color="#704d37" roughness={.76}/></mesh>
 {Array.from({length:12},(_,i)=>{const x=-5.8+i*1.05;return <group key={i} position={[x,3.42,.85]}>
  <mesh rotation={[0,0,Math.PI/4]}><boxGeometry args={[.35,.35,.45]}/><meshStandardMaterial color={i%2?'#c68f55':'#9b6144'} roughness={.88}/></mesh>
  <mesh position={[0,.4,0]}><sphereGeometry args={[.13,8,8]}/><meshStandardMaterial color="#eac798" roughness={.85}/></mesh>
 </group>})}
 <mesh position={[0,4.25,-.2]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.23,.23,10,12]}/><meshStandardMaterial color="#a4734e" roughness={.8}/></mesh>
 {[-3.5,-1.75,0,1.75,3.5].map((x,i)=><mesh key={i} position={[x,4.7,-.2]}><sphereGeometry args={[.48-i%2*.08,16,10]}/><meshStandardMaterial color={i===2?'#eac18f':'#be8e67'} roughness={.91}/></mesh>)}
 <mesh position={[0,.3,-1.55]}><planeGeometry args={[7.6,2.7]}/><meshStandardMaterial color="#473035" roughness={.95} side={THREE.DoubleSide}/></mesh>
 {[0,1,2,3,4,5,6].map(i=><mesh key={i} rotation={[0,0,Math.PI*.25]} position={[-3.3+i*1.1,.45,-1.5]}><torusGeometry args={[.48,.055,8,4]}/><meshStandardMaterial color="#d6ac77" roughness={.72}/></mesh>)}
 </group>}
function SilkBanners(){return <group>
 {[-4.2,4.2].map((x,i)=><group key={i}>
  <mesh position={[x,1.27,-1.1]} rotation={[0,0,i===0?.12:-.12]}><planeGeometry args={[.48,2.5]}/><meshStandardMaterial color={i===0?'#a9433e':'#d79939'} side={THREE.DoubleSide} roughness={1}/></mesh>
  <mesh position={[x,1.1,-1.06]}><planeGeometry args={[.07,2.3]}/><meshStandardMaterial color="#efc273" side={THREE.DoubleSide}/></mesh>
 </group>)}
 </group>}

function Courtyard(){return <group>
 <Stone position={[0,-1.3,-.25]} size={[30,.38,23]} color="#916d5b"/>
 {Array.from({length:10},(_,i)=><Stone key={i} position={[0,-1.09,-6+i*1.2]} size={[15,.045,.035]} color="#dfbb90"/>)}
 <Stone position={[0,-.52,-4.55]} size={[12.7,1.1,4]} color="#b79072"/>
 <Stone position={[0,.10,-4.85]} size={[11.9,1.1,3.3]} color="#b58a66"/>
 <Stone position={[0,2.75,-3]} size={[13.6,.52,4]} color="#ba875d"/>
 <Stone position={[0,3.18,-3]} size={[14.2,.27,4.7]} color="#6b504e"/>
 <Stone position={[0,3.44,-3]} size={[14.5,.13,5]} color="#dbab7d"/>
 {[-5,-2.5,0,2.5,5].map(x=><Column key={x} x={x} z={-2.8}/>)}
 <Stone position={[0,-.69,-.5]} size={[6.7,.25,4]} color="#e2b989"/>
 <Stone position={[0,-.91,1.2]} size={[8.2,.2,2.1]} color="#bd906e"/>
 <Stone position={[0,-1.04,2.15]} size={[9.8,.14,1]} color="#9c7561"/>
 <FestivalMandapa/><SilkBanners/><Garlands/><Rangoli/>
 {[-5.7,5.7].map((x,i)=><group key={i} position={[x,-1.03,1]}><mesh><cylinderGeometry args={[.28,.38,1.5,12]}/><meshStandardMaterial color="#bf853b" metalness={.65} roughness={.28}/></mesh><mesh position={[0,.84,0]}><sphereGeometry args={[.23,12,12]}/><meshStandardMaterial color="#ffe1a1" emissive="#f9a444" emissiveIntensity={1.5}/></mesh><pointLight position={[0,1,0]} intensity={2.5} distance={4} color="#ffc46f"/></group>)}
 <Petals/>
 </group>}
function CameraRig({progress}:{progress:number}){useFrame(({camera,pointer})=>{const x=THREE.MathUtils.lerp(0,-1.6,progress)+pointer.x*.27;const y=THREE.MathUtils.lerp(2.1,3.3,progress)+pointer.y*.1;const z=THREE.MathUtils.lerp(13,8.3,progress);camera.position.lerp(new THREE.Vector3(x,y,z),.025);camera.lookAt(0,.3,-1.4)});return null}
export default function UTACinematicScene(){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{let frame=0;const update=()=>{if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>setProgress(Math.max(0,Math.min(1,window.scrollY/(window.innerHeight*1.35)))))};
 window.addEventListener('scroll',update,{passive:true});update();return()=>{window.removeEventListener('scroll',update);cancelAnimationFrame(frame)}},[]);
 return <Canvas shadows={false} dpr={[1,1.5]} camera={{position:[0,2.1,13],fov:49}} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}} fallback={<div aria-hidden="true"/>}>
 <color attach="background" args={['#756277']}/>
 <fog attach="fog" args={['#ac8791',14,30]}/>
 <ambientLight intensity={1.05} color="#ffe3c7"/>
 <hemisphereLight args={['#ffe7ba','#624357',1.3]}/>
 <directionalLight position={[8,12,9]} intensity={4.3} color="#ffd29d"/>
 <directionalLight position={[-6,3,-7]} intensity={1.4} color="#ee9a72"/>
 <Courtyard/><CameraRig progress={progress}/>
 </Canvas>
}
