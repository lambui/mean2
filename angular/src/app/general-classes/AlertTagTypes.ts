//object
const AlertTypes = [
    "attention",
    "reminder",
    "urgent",
    "alert",
    "note"
];

const AlertTypeIcon = [
    "error",
    "alarm",
    "warning",
    "warning",
    "cloud"
];

const AlertTypeColor = [
    "orange",
    "green",
    "red",
    "red",
    "grey lighten-2"
];

const AlertTypeTextStyle = [
    "white-text",
    "white-text",
    "white-text",
    "white-text",
    "black-text"
];

const AlertTypeChipStyle = [
    "orange white-text cursor-pointer",
    "green white-text cursor-pointer",
    "red pulse white-text cursor-pointer",
    "red white-text cursor-pointer",
    "grey lighten-2 black-text cursor-pointer",
];

export var AlertTypeObject = {
    Type: AlertTypes,
    Icon: AlertTypeIcon,
    Color: AlertTypeColor,
    TextStyle: AlertTypeTextStyle,
    ChipStyle: AlertTypeChipStyle
};

//functions
var GetAlertTypeIndex = type => {
    return AlertTypes.indexOf(type);
}

var GetAlertTypeIcon = type => {
  let index = AlertTypes.indexOf(type);
  if(index >= 0 && index < AlertTypeIcon.length)
    return AlertTypeIcon[index];
}

var GetAlertTypeColor = type => {
    let index = AlertTypes.indexOf(type);
    if(index >= 0 && index < AlertTypeColor.length)
      return AlertTypeColor[index];
}

var GetAlertTypeObject = type => {
    let index = AlertTypes.indexOf(type);
    if(index >= 0 && index < AlertTypes.length)
    {
        let object: any = {};
        for(var key in AlertTypeObject)
        {
            if (AlertTypeObject.hasOwnProperty(key))
            {
                object[key] = AlertTypeObject[key][index];
            }
        }
        return object;
    }
    return null;
}

export var AlertTypeFunctions = {
    GetAlertTypeIndex: GetAlertTypeIndex,
    GetAlertTypeObject: GetAlertTypeObject,
    GetAlertTypeIcon: GetAlertTypeIcon,
    GetAlertTypeColor: GetAlertTypeColor
}