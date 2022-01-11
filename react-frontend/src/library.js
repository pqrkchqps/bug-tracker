Date.prototype.yyyymmddt = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var t = this.toTimeString();
    t = t.substring(0,8)

    const returnString = this.getFullYear()+"-"+(mm>9 ? '' : '0')+mm+"-"+(dd>9 ? '' : '0')+dd+"T"+t
  
    return returnString
  };