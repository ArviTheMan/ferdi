/**
 * Get current information about the platform to use with the Chrome Webstore API
 *
 * Source: https://github.com/Rob--W/crxviewer/blob/f556e326bab7a1dd9839221ebb66183cd0776f65/src/chrome-platform-info.js#L54
 */
export default () => {
  let os;
  let arch;

  // For the definition of the navigator object, see Chromium's source code:
  //  third_party/WebKit/Source/core/page/NavigatorBase.cpp
  //  webkit/common/user_agent/user_agent_util.cc

  // UA := "Mozilla/5.0 (%s) AppleWebKit/%d.%d (KHTML, like Gecko) %s Safari/%d.%d"
  //                     ^^                                        ^^
  //                     Platform + CPUinfo                        Product, Chrome/d.d.d.d
  let ua = navigator.userAgent;
  ua = ua.split('AppleWebKit')[0] || ua;
  // After splitting, we get the next string:
  // ua := "5.0 (%s) "

  // The string in comments is the line with the actual definition in user_agent_util.cc,
  // unless said otherwise.
  if (ua.indexOf('Mac') >= 0) {
    // "Intel Mac OS X %d_%d_%d",
    os = 'mac';
  } else if (ua.indexOf('Win') >= 0) {
    // "Windows NT %d.%d%s",
    os = 'win';
  } else if (ua.indexOf('Android') >= 0) {
    // Note: "Linux; " is preprended, so test Android before Linux
    // "Android %s%s",
    os = 'android';
  } else if (ua.indexOf('CrOS') >= 0) {
    // "CrOS "
    // "%s %d.%d.%d",
    os = 'cros';
  } else if (ua.indexOf('BSD') >= 0) {
    os = 'openbsd';
  } else { // if (ua.indexOf('Linux') >= 0) {
    os = 'linux';
  }

  if (/\barm/.test(ua)) {
    arch = 'arm';
  } else if (/[^.0-9]64(?![.0-9])/.test(ua)) {
    // WOW64, Win64, amd64, etc. Assume 64-bit arch when there's a 64 in the string, not surrounded
    // by dots or digits (this restriction is set to avoid matching version numbers)
    arch = 'x86-64';
  } else {
    arch = 'x86-32';
  }
  return {
    os,
    arch,
    nacl_arch: arch,
  };
};
