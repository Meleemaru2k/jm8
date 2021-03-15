const jm8 = {
  /*
    Cookie Manipulation
    Not sorted under doc for several reasons (e.g. frequent use => quicker access)
  */
  cookie: {
    set: (cookieName, cookieValue, expirationDays) => {
      var maxAge =
        expirationDays === 0 ? "" : "Max-Age=" + (expirationDays * 24 * 60 * 60).toString() + ";";
      document.cookie = cookieName + "=" + cookieValue + ";" + maxAge + "SameSite=None;Secure;Path=/";
      return cookieValue;
    },
    get: (cookieName) => {
      var name = cookieName + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var cookieArray = decodedCookie.split(";");
      for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == " ") {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return undefined;
    },
  },
  /*
    Shortcuts for Document Functionality
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
    HtmlLanguageTag: {
      get: () => {
        let lang = document.documentElement.lang;
        if (lang != undefined && lang.length != 0) {
          return lang.slice(0, 2).toLowerCase();
        } else {
          return undefined;
        }
      },
    },
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
  checkFormat: {
    email: (email) => {},
    phonenumer: (phonenumber) => {
      if (typeof phonenumber !== "string") {
        try {
          phonenumber = phonenumber.toString();
        } catch {
          return false;
        }
      }
      phonenumber = phonenumber.replace(/\s/g, "");

      const regex = /(?:^(?:\+\d{2}\d{3,16}|\d{5,18})$)/gm;
      let match = regex.exec(phonenumber);

      if (match != undefined) {
        return true;
      } else {
        return false;
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
    scrollToId: (id, offset = 0) => {
      let elemScrollY = document.getElementById(id).getBoundingClientRect().top;
      let bodyY = document.body.getBoundingClientRect().top;
      window.scrollTo({
        top: elemScrollY - bodyY - offset,
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
    //getElementScroll(){}
  },
};
