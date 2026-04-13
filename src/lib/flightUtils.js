export const FL_CITIES={JFK:'New York',LAX:'Los Angeles',ORD:'Chicago',LHR:'London',CDG:'Paris',NRT:'Tokyo',DXB:'Dubai',SIN:'Singapore',HKG:'Hong Kong',SYD:'Sydney',FRA:'Frankfurt',AMS:'Amsterdam',ATL:'Atlanta',DFW:'Dallas',MIA:'Miami',SFO:'San Francisco',SEA:'Seattle',BOS:'Boston',DEN:'Denver',IAH:'Houston',CUN:'Cancún',FCO:'Rome',BCN:'Barcelona',IST:'Istanbul',DOH:'Doha',ZRH:'Zurich',MUC:'Munich',BRU:'Brussels',LIS:'Lisbon',DEL:'Delhi',BOM:'Mumbai',BKK:'Bangkok',ICN:'Seoul',PEK:'Beijing',DPS:'Bali',MEX:'Mexico City',GRU:'São Paulo',EZE:'Buenos Aires',CPT:'Cape Town'};

export const AIRPORTS=Object.entries(FL_CITIES).map(([code,city])=>({code,city,label:`${city} (${code})`}));

const FL_AIRLINES=[
  {name:'British Airways',code:'BA',logo:'✈️'},{name:'Delta Air Lines',code:'DL',logo:'🛫'},
  {name:'Virgin Atlantic',code:'VS',logo:'🌍'},{name:'American Airlines',code:'AA',logo:'⭐'},
  {name:'Air France',code:'AF',logo:'🇫🇷'},{name:'Emirates',code:'EK',logo:'🌸'},
  {name:'United Airlines',code:'UA',logo:'🌐'},{name:'Lufthansa',code:'LH',logo:'🦅'},
  {name:'Singapore Airlines',code:'SQ',logo:'🦁'},{name:'Qatar Airways',code:'QR',logo:'🟣'},
];
const FL_LAYOVERS=['AMS','FRA','CDG','DXB','ORD','ATL','ZRH','MUC','BRU','IST','DOH','LHR'];
const FL_AIRCRAFT=['Boeing 737','Boeing 777','Boeing 787','Airbus A320','Airbus A330','Airbus A350','Airbus A380'];

export function flRnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function flPick(arr){return arr[flRnd(0,arr.length-1)];}
function flPad(n){return String(n).padStart(2,'0');}
export function flFmt(h,m){return flPad(h%24)+':'+flPad(m);}
export function flHrMin(mins){const h=Math.floor(mins/60),m=mins%60;return h+'h'+(m?' '+m+'m':'');}
function flAddMins(h,m,add){const t=h*60+m+add;return{h:Math.floor(t/60)%24,m:t%60,days:Math.floor(t/1440)};}
export function flCity(code){return FL_CITIES[code]||code;}

export function flParseCode(str){
  const m=str.match(/\(([A-Z]{3})\)/);
  if(m)return m[1];
  const up=str.trim().toUpperCase();
  if(up.length===3&&FL_CITIES[up])return up;
  for(const code of Object.keys(FL_CITIES)){if(str.toUpperCase().includes(code))return code;}
  return 'JFK';
}

export function flStopBadgeClass(stops){
  return['fl-nonstop','fl-onestop','fl-twostop','fl-threestop','fl-fourstop'][Math.min(stops,4)];
}
export function flStopLabel(stops){
  return['Non-stop','1 Stop','2 Stops','3 Stops','4 Stops'][Math.min(stops,4)];
}

export function flGenLeg(fromCode,toCode,numStops,depH,depM){
  const airline=flPick(FL_AIRLINES);
  const flightNum=airline.code+flRnd(100,999);
  const baseMins=[flRnd(360,520),flRnd(520,720),flRnd(720,960),flRnd(960,1200),flRnd(1200,1440)];
  const totalMins=baseMins[Math.min(numStops,4)];
  const arr=flAddMins(depH,depM,totalMins);
  const layovers=[];
  if(numStops>0){
    const perSeg=Math.floor(totalMins/(numStops+1));
    let elapsed=0;
    for(let i=0;i<numStops;i++){
      elapsed+=perSeg;
      const layMins=flRnd(45,180);
      const layAt=flAddMins(depH,depM,elapsed);
      const depAt=flAddMins(layAt.h,layAt.m,layMins);
      const apt=FL_LAYOVERS[flRnd(0,FL_LAYOVERS.length-1)];
      layovers.push({airport:apt,city:flCity(apt),arr:flFmt(layAt.h,layAt.m),layMins,dep:flFmt(depAt.h,depAt.m),nextFlight:airline.code+flRnd(100,999)});
      elapsed+=layMins;
    }
  }
  const priceBase=[389,309,249,209,189];
  const price=priceBase[Math.min(numStops,4)]+flRnd(-20,80);
  return{airline,flightNum,fromCode,toCode,fromCity:flCity(fromCode),toCity:flCity(toCode),depH,depM,arrH:arr.h,arrM:arr.m,daysPlus:arr.days,totalMins,numStops,layovers,price,isRefund:flRnd(0,1)===1,hasBag:flRnd(0,3)>0,seatsLeft:flRnd(0,12),aircraft:flPick(FL_AIRCRAFT)};
}

export function generateFlightPool(tripType,from,to,mcLegs){
  const fromCode=flParseCode(from),toCode=flParseCode(to);
  const stopOrder=[0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2];
  const depH=[6,8,10,12,14,16,18,20,7,9,11,13,15,17,19,21,6,8];
  const pool=[];
  if(tripType==='oneway'){
    stopOrder.forEach((stops,i)=>{
      const leg=flGenLeg(fromCode,toCode,stops,depH[i%depH.length],flRnd(0,3)*15);
      pool.push({type:'oneway',outbound:leg,id:`ow-${i}`,best:i===0});
    });
  }else if(tripType==='roundtrip'){
    const retMap=[0,0,1,1,2,2,2,3,3,4,0,1,2,3,4,0,1,2];
    stopOrder.forEach((outStops,i)=>{
      const dh=depH[i%depH.length];
      const out=flGenLeg(fromCode,toCode,outStops,dh,flRnd(0,3)*15);
      const ret=flGenLeg(toCode,fromCode,retMap[i],(dh+8)%24,flRnd(0,3)*15);
      pool.push({type:'roundtrip',outbound:out,returnLeg:ret,id:`rt-${i}`,best:i===0});
    });
  }else{
    const legs=mcLegs&&mcLegs.length>=2?mcLegs:[{from:'JFK',to:'CDG'},{from:'CDG',to:'FCO'}];
    stopOrder.forEach((_,combo)=>{
      const fLegs=legs.map((r,li)=>{
        const fc=flParseCode(r.from||'JFK'),tc=flParseCode(r.to||'LHR');
        const stops=stopOrder[(combo+li)%stopOrder.length];
        return flGenLeg(fc,tc,stops,(depH[combo%depH.length]+li*5)%24,flRnd(0,3)*15);
      });
      pool.push({type:'multicity',legs:fLegs,totalPrice:fLegs.reduce((s,l)=>s+l.price,0),id:`mc-${combo}`,best:combo===0});
    });
  }
  return pool;
}

// Safe helpers — work with both API response format AND generated format
export function getFlightPrice(f) {
  if (!f) return 0;
  // API formats: f.price, f.fare, f.totalPrice, f.total_price
  if (f.price != null) return Number(f.price) || 0;
  if (f.fare != null) return Number(f.fare) || 0;
  if (f.totalPrice != null) return Number(f.totalPrice) || 0;
  if (f.total_price != null) return Number(f.total_price) || 0;
  // Generated format
  if (f.type === 'multicity') return f.totalPrice || 0;
  const outPrice = f.outbound?.price || 0;
  const retPrice = f.returnLeg?.price || 0;
  return f.type === 'roundtrip' ? outPrice + retPrice : outPrice;
}

export function getFlightStops(f) {
  if (!f) return 0;
  if (f.stops != null) return Number(f.stops);
  if (f.numStops != null) return Number(f.numStops);
  if (f.type === 'multicity') return Math.max(...(f.legs || []).map(l => l?.numStops || 0));
  return f.outbound?.numStops || 0;
}

export function getFlightDuration(f) {
  if (!f) return 0;
  if (f.duration != null) return Number(f.duration);
  if (f.totalMins != null) return Number(f.totalMins);
  if (f.type === 'multicity') return (f.legs || []).reduce((s, l) => s + (l?.totalMins || 0), 0);
  const outMins = f.outbound?.totalMins || 0;
  const retMins = f.returnLeg?.totalMins || 0;
  return f.type === 'roundtrip' ? outMins + retMins : outMins;
}

export function getFlightAirline(f) {
  if (!f) return 'Unknown';
  // API formats
  if (f.airline) return typeof f.airline === 'string' ? f.airline : f.airline?.name || 'Unknown';
  if (f.carrier) return f.carrier;
  if (f.airlineName) return f.airlineName;
  // Generated format
  if (f.type === 'multicity') return f.legs?.[0]?.airline?.name || 'Unknown';
  return f.outbound?.airline?.name || 'Unknown';
}

export const popularRoutes=[
  {from:'NYC',to:'LONDON',fromFull:'New York JFK',toFull:'London LHR',airline:'British Airways',duration:'7h 15m',stops:'Non-stop',cabin:'Economy',desc:'Includes 1 checked bag and seat selection.',price:349,badge:'🔥 Lowest Fare',img:'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=80'},
  {from:'LA',to:'TOKYO',fromFull:'Los Angeles LAX',toFull:'Tokyo NRT',airline:'ANA',duration:'11h 15m',stops:'Non-stop',cabin:'Economy',desc:'Includes 2 checked bags, meals and in-flight entertainment.',price:699,badge:'⭐ Top Pick',img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80'},
  {from:'CHICAGO',to:'PARIS',fromFull:'Chicago ORD',toFull:'Paris CDG',airline:'Air France',duration:'8h 30m',stops:'Non-stop',cabin:'Economy',desc:'Complimentary wine, 3-course dinner and priority boarding.',price:419,badge:'✨ Best Value',img:'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80'},
  {from:'DALLAS',to:'CANCÚN',fromFull:'Dallas DFW',toFull:'Cancún CUN',airline:'American Airlines',duration:'2h 45m',stops:'Non-stop',cabin:'Economy',desc:'Perfect gateway to the Mexican Riviera Maya.',price:189,badge:'🏖 Sun & Beach',img:'https://images.unsplash.com/photo-1512253022256-19f4cb92a4dc?w=600&q=80'},
  {from:'NYC',to:'DUBAI',fromFull:'New York JFK',toFull:'Dubai DXB',airline:'Emirates',duration:'12h 45m',stops:'Non-stop',cabin:'Economy',desc:'Award-winning service and complimentary chauffeur on arrival.',price:549,badge:'💎 Premium',img:'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80'},
  {from:'SF',to:'BALI',fromFull:'San Francisco SFO',toFull:'Bali DPS',airline:'Singapore Airlines',duration:'18h 20m',stops:'1 stop',cabin:'Economy',desc:"Voted world's best airline 2024 by Skytrax.",price:749,badge:'🌴 Paradise',img:'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80'},
];

export const compareData=[
  {airline:'British Airways',emoji:'✈️',stops:'Non-stop · Economy',dep:'08:15 JFK → 20:30 LHR',dur:'7h 15m',price:349,best:true},
  {airline:'Delta Air Lines',emoji:'🛫',stops:'1 Stop · Economy',dep:'10:00 JFK → 23:45 LHR',dur:'9h 45m',price:389,best:false},
  {airline:'Virgin Atlantic',emoji:'🌍',stops:'Non-stop · Economy',dep:'13:30 JFK → 01:55 LHR',dur:'7h 25m',price:412,best:false},
  {airline:'American Airlines',emoji:'⭐',stops:'1 Stop · Economy',dep:'07:00 JFK → 22:20 LHR',dur:'10h 20m',price:435,best:false},
  {airline:'Japan Airlines',emoji:'🌸',stops:'1 Stop via Tokyo · Economy',dep:'12:00 JFK → 16:40 LHR+1',dur:'15h 40m',price:311,best:false},
];

export const flexibleDates=[
  {dow:'TUE',date:'Jun 11',price:521,level:'high',height:'80%'},{dow:'WED',date:'Jun 12',price:489,level:'high',height:'65%'},
  {dow:'THU',date:'Jun 13',price:421,level:'mid',height:'45%'},{dow:'FRI',date:'Jun 14',price:479,level:'high',height:'70%'},
  {dow:'SAT',date:'Jun 15',price:349,level:'active',height:'15%',lowest:true},{dow:'SUN',date:'Jun 16',price:362,level:'cheap',height:'20%'},
  {dow:'MON',date:'Jun 17',price:388,level:'cheap',height:'28%'},{dow:'TUE',date:'Jun 18',price:412,level:'mid',height:'48%'},
  {dow:'WED',date:'Jun 19',price:398,level:'cheap',height:'33%'},{dow:'THU',date:'Jun 20',price:445,level:'mid',height:'56%'},
  {dow:'FRI',date:'Jun 21',price:519,level:'high',height:'82%'},{dow:'SAT',date:'Jun 22',price:548,level:'high',height:'90%'},
  {dow:'SUN',date:'Jun 23',price:371,level:'cheap',height:'24%'},{dow:'MON',date:'Jun 24',price:359,level:'cheap',height:'18%'},
  {dow:'TUE',date:'Jun 25',price:561,level:'high',height:'95%'},{dow:'WED',date:'Jun 26',price:467,level:'mid',height:'60%'},
  {dow:'THU',date:'Jun 27',price:387,level:'cheap',height:'30%'},{dow:'FRI',date:'Jun 28',price:578,level:'high',height:'98%'},
  {dow:'SAT',date:'Jun 29',price:414,level:'mid',height:'42%'},{dow:'SUN',date:'Jun 30',price:355,level:'cheap',height:'16%'},
  {dow:'MON',date:'Jul 1',price:432,level:'mid',height:'50%'},{dow:'TUE',date:'Jul 2',price:368,level:'cheap',height:'22%'},
];
