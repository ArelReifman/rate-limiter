export class RateLimiter{
    private limit: number;
    private windowMs: number;
    private entry = new Map<string,{count:number, windowStart: number}>();
    constructor(limit:number,windowMs: number){
        this.limit= limit;
        this.windowMs = windowMs;
    }
    isAllowed(key: string): boolean{
    const miliseconds = Date.now();    
         if(!this.entry.has(key)){
        this.entry.set(key,{count:1,windowStart:miliseconds});
    }
    else{
        this.entry.set(key, {count: this.entry.get(key)!.count + 1, windowStart: this.entry.get(key)!.windowStart});
    }
    let ipData = this.entry.get(key);
    if(miliseconds - ipData!.windowStart  > this.windowMs ){
        this.entry.set(key,{count:1,windowStart:miliseconds});
        ipData = this.entry.get(key);
    }
   
    else
    {
        if(ipData!.count>this.limit)
        {
            return false;
        }
    }
    return true;
    }

}

   
