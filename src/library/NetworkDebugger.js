// config network debugger

if (global.__REMOTEDEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest : global.XMLHttpRequest;
  global.FormData = global.originalFormData ? global.originalFormData : global.FormData;
}

export const NetworkDebugger = "JUST FOR IMPORT";
