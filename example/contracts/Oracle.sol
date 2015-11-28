contract Oracle {
    uint a = 256;
    
    function writeValue(uint s) {
        a = s;
    }
    
    function readValue() constant returns (uint value) {
        return a;
    }
}