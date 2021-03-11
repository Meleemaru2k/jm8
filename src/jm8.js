const jm8 = {
  /*
    Description Goes Here
    */
  cookie: {
    set: (cookieName, cookieValue, expirationDays) => {
      var maxAge =
        expirationDays === 0 ? "" : "Max-Age=" + (expirationDays * 24 * 60 * 60).toString() + ";";

      if (HOME_STRINGS.includes(SITE_HOSTNAME) || SITE_HOSTNAME === "127.0.0.1") {
        document.cookie = cookieName + "=" + cookieValue + ";" + maxAge + "SameSite=Lax;Path=/";
      } else {
        document.cookie = cookieName + "=" + cookieValue + ";" + maxAge + "SameSite=None;Secure;Path=/";
      }
      return cookieValue;
    },
    get: (cookieName) => {
      var name = cookieName + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return undefined;
    },
  },
  /*
    Description Goes Here
    */
  doc: {
    queryString: {
      get: (key) => {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has(key)) {
          return urlParams.get(key);
        } else {
          return undefined;
        }
      },
    },
  },
  getLanguageFromHtml: () => {
    let lang = document.documentElement.lang;
    if (lang != undefined && lang.length != 0) {
      return lang.slice(0, 2).toLowerCase();
    } else {
      return undefined;
    }
  },
  /*
    Description Goes Here
    */
  convert: {
    linkFormatter: () => {
      let isHttps = link.indexOf("https://");
      let isHttp = link.indexOf("http://");
      let isOk = link.indexOf("//");

      if (isHttps === 0 || isHttp === 0) {
        return link;
      } else if (isOk === 0) {
        return link;
      } else {
        return "//" + link;
      }
    },
  },
  j: {
    sleep: (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
  /*
    Description Goes Here
    */
  window: {
    scrollToId: (id) => {
      let elemScrollY = document.getElementById(id).getBoundingClientRect().top;
      let bodyY = document.body.getBoundingClientRect().top;
      let headerHeight = document.getElementById("navMenu").getBoundingClientRect().height || 0;
      window.scrollTo({
        top: elemScrollY - bodyY - headerHeight,
        behavior: "smooth",
      });
    },
    getScroll: () => {
      if (window.pageYOffset != undefined) {
        return [pageXOffset, pageYOffset];
      } else {
        var sx,
          sy,
          d = document,
          r = d.documentElement,
          b = d.body;
        sx = r.scrollLeft || b.scrollLeft || 0;
        sy = r.scrollTop || b.scrollTop || 0;
        return [sx, sy];
      }
    },
  },
};
