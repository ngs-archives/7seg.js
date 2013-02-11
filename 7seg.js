var SevenSegment = function(value) {
  this.value = value;
}

SevenSegment.prototype = {

  getSegments: function(order) {
    var value = this.value
      , digits = []
      , digit, i, dp;

    if(typeof value == "number")
      value = value.toString();

    for (i = 0; i < value.length; i++) {
      dp    = value[i+1] == ".";
      digit = new SevenSegment.Digit(value[i], dp);
      digits.push(digit.getValue());
      if(dp) i++;
    }
    return digits;
  },
  
  getByteArray: function() {
    var value = this.value
      , digits = []
      , digit, i, dp;

    if(typeof value == "number")
      value = value.toString();

    for (i = 0; i < value.length; i++) {
      dp    = value[i+1] == ".";
      digit = new SevenSegment.Digit(value[i], dp);
      digits.push(digit.getByteArray());
      if(dp) i++;
    }
    return digits;
  },

  getABCDEFGSegments: function() {
    return this.getSegments(SevenSegment.Order.ABCDEFG);
  },

  getGFEDCBASegments: function() {
    return this.getSegments(SevenSegment.Order.GFEDCBA);
  }

}

SevenSegment.Digit = function(value, decimalPoint) {
  this.value = value;
  this.decimalPoint = decimalPoint;
}

SevenSegment.Digit.prototype = {
  getValue: function(order) {
    var ba = this.getByteArray();
    if(order == SevenSegment.Order.GFEDCBA)
      ba.reverse();
    return parseInt(ba.join("") || "0", 2)
  },
  getByteArray: function() {
    var value = this.value.toString()
      , code  = value.charCodeAt(0)
      , bin   = SevenSegment.Segments[code - 45]
      , ar    = Array.apply(this, bin)
      ;
    ar.unshift(this.decimalPoint ? 0 : 1);
    return ar;
  }
}

SevenSegment.Order = {
  ABCDEFG: 0,
  GFEDCBA: 1
};

SevenSegment.Segments = [
/*           [a, b, c, d, e, f, g] */

/*  45: - */ [0, 0, 0, 0, 0, 0, 1],
/*  46: . */ [0, 0, 0, 0, 0, 0, 0],
/*  47: / */ [0, 1, 0, 0, 1, 0, 1],
/*  48: 0 */ [1, 1, 1, 1, 1, 1, 0],
/*  49: 1 */ [0, 1, 1, 0, 0, 0, 0],
/*  50: 2 */ [1, 1, 0, 1, 1, 0, 1],
/*  51: 3 */ [1, 1, 1, 1, 0, 0, 1],
/*  52: 4 */ [0, 1, 1, 0, 0, 1, 1],
/*  53: 5 */ [1, 0, 1, 1, 0, 1, 1],
/*  54: 6 */ [1, 0, 1, 1, 1, 1, 1],
/*  55: 7 */ [1, 1, 1, 0, 0, 0, 0],
/*  56: 8 */ [1, 1, 1, 1, 1, 1, 1],
/*  57: 9 */ [1, 1, 1, 1, 0, 1, 1],
/*  58: : */ [0, 0, 0, 0, 0, 0, 0],
/*  59: ; */ [0, 0, 0, 0, 0, 0, 0],
/*  60: < */ [0, 0, 0, 0, 0, 0, 0],
/*  61: = */ [0, 0, 0, 1, 0, 0, 1],
/*  62: > */ [0, 0, 0, 0, 0, 0, 0],
/*  63: ? */ [0, 0, 0, 0, 0, 0, 0],
/*  64: @ */ [0, 0, 0, 0, 0, 0, 0],

/*  65: A */ [1, 1, 1, 0, 1, 1, 1],
/*  98: b */ [0, 0, 1, 1, 1, 1, 1],
/*  67: C */ [1, 0, 0, 1, 1, 1, 0],
/* 100: d */ [0, 1, 1, 1, 1, 0, 1],
/*  69: E */ [1, 0, 0, 1, 1, 1, 1],
/*  70: F */ [1, 0, 0, 0, 1, 1, 1],
/*  71: G */ [1, 0, 1, 1, 1, 1, 0],
/*  72: H */ [0, 1, 1, 0, 1, 1, 1],
/* 105: i */ [0, 0, 0, 0, 1, 0, 0],
/*  74: J */ [0, 1, 1, 1, 1, 0, 0],
/* 107: k */ [0, 1, 0, 1, 1, 1, 1],
/*  76: L */ [0, 0, 0, 1, 1, 1, 0],
/* 109: m */ [1, 0, 1, 0, 1, 0, 1],
/*  78: N */ [1, 1, 1, 0, 1, 1, 0],
/*  48: 0 */ [1, 1, 1, 1, 1, 1, 0],
/*  80: P */ [1, 1, 0, 0, 1, 1, 1],
/* 113: q */ [1, 1, 1, 0, 0, 1, 1],
/* 114: r */ [0, 0, 0, 0, 1, 0, 1],
/*  53: 5 */ [1, 0, 1, 1, 0, 1, 1],
/* 116: t */ [0, 0, 0, 1, 1, 1, 1],
/*  85: U */ [0, 1, 1, 1, 1, 1, 0],
/*  85: U */ [0, 1, 1, 1, 1, 1, 0],
/* 108: W */ [1, 0, 1, 1, 1, 0, 0],
/*  72: H */ [0, 1, 1, 0, 1, 1, 1],
/*  89: Y */ [0, 1, 1, 1, 0, 1, 1],
/*  50: 2 */ [1, 1, 0, 1, 1, 0, 1],

/*  67: C */ [1, 0, 0, 1, 1, 1, 0],
/*  92: \ */ [0, 0, 1, 0, 0, 1, 1],
/*  93: ] */ [1, 1, 1, 1, 0, 0, 0],
/*  94: ^ */ [0, 0, 0, 0, 0, 0, 0],
/*  95: _ */ [0, 0, 0, 1, 0, 0, 0],
/*  96: ` */ [0, 0, 0, 0, 0, 0, 0],

/*  97: a */ [1, 1, 1, 1, 1, 0, 1],
/*  98: b */ [0, 0, 1, 1, 1, 1, 1],
/*  99: c */ [0, 0, 0, 1, 1, 0, 1],
/* 100: d */ [0, 1, 1, 1, 1, 0, 1],
/* 101: e */ [1, 1, 0, 1, 1, 1, 1],
/*  70: F */ [1, 0, 0, 0, 1, 1, 1],
/*  57: 9 */ [1, 1, 1, 1, 0, 1, 1],
/* 104: h */ [0, 0, 1, 0, 1, 1, 1],
/* 105: i */ [0, 0, 0, 0, 1, 0, 0],
/* 106: j */ [0, 1, 1, 1, 0, 0, 0],
/* 107: k */ [0, 1, 0, 1, 1, 1, 1],
/*  76: L */ [0, 0, 0, 1, 1, 1, 0],
/* 109: m */ [1, 0, 1, 0, 1, 0, 1],
/* 110: n */ [0, 0, 1, 0, 1, 0, 1],
/* 111: o */ [0, 0, 1, 1, 1, 0, 1],
/*  80: P */ [1, 1, 0, 0, 1, 1, 1],
/* 113: q */ [1, 1, 1, 0, 0, 1, 1],
/* 114: r */ [0, 0, 0, 0, 1, 0, 1],
/*  53: 5 */ [1, 0, 1, 1, 0, 1, 1],
/* 116: t */ [0, 0, 0, 1, 1, 1, 1],
/* 117: u */ [0, 0, 1, 1, 1, 0, 0],
/*  85: U */ [0, 1, 1, 1, 1, 1, 0],
/* 108: W */ [1, 0, 1, 1, 1, 0, 0],
/*  72: H */ [0, 1, 1, 0, 1, 1, 1],
/*  89: Y */ [0, 1, 1, 1, 0, 1, 1],
/*  50: 2 */ [1, 1, 0, 1, 1, 0, 1]
];