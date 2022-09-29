var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module, temp) => {
    return cache && cache.get(module) || (temp = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// docs/.vuepress/webSiteInfo/readFile.ts
var readFile_exports = {};
__export(readFile_exports, {
  readEachFileWords: () => readEachFileWords,
  readFileList: () => readFileList,
  readTotalFileWords: () => readTotalFileWords
});
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import chalk from "chalk";
function readFileList(excludeFiles = [""], dir = docsRoot, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item, index) => {
    let filePath = path.join(dir, item);
    const stat = fs.statSync(filePath);
    if (!(excludeFiles instanceof Array)) {
      log(chalk.yellow(`error: \u4F20\u5165\u7684\u53C2\u6570\u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4\u3002`));
    }
    excludeFiles.forEach((excludeFile) => {
      if (stat.isDirectory() && item !== ".vuepress" && item !== "@pages" && item !== excludeFile) {
        readFileList(excludeFiles, path.join(dir, item), filesList);
      } else {
        if (path.basename(dir) !== "docs") {
          const fileNameArr = path.basename(filePath).split(".");
          let name = null, type = null;
          if (fileNameArr.length === 2) {
            name = fileNameArr[0];
            type = fileNameArr[1];
          } else if (fileNameArr.length === 3) {
            name = fileNameArr[1];
            type = fileNameArr[2];
          } else {
            log(chalk.yellow(`warning: \u8BE5\u6587\u4EF6 "${filePath}" \u6CA1\u6709\u6309\u7167\u7EA6\u5B9A\u547D\u540D\uFF0C\u5C06\u5FFD\u7565\u751F\u6210\u76F8\u5E94\u6570\u636E\u3002`));
            return;
          }
          if (type === "md") {
            filesList.push({
              name,
              filePath
            });
          }
        }
      }
    });
  });
  return filesList;
}
function readTotalFileWords(excludeFiles = [""]) {
  const filesList = readFileList(excludeFiles);
  var wordCount = 0;
  filesList.forEach((item) => {
    const content = getContent(item.filePath);
    var len = counter(content);
    wordCount += len[0] + len[1];
  });
  if (wordCount < 1e3) {
    return wordCount;
  }
  return Math.round(wordCount / 100) / 10 + "k";
}
function readEachFileWords(excludeFiles = [""], cn, en) {
  const filesListWords = [];
  const filesList = readFileList(excludeFiles);
  filesList.forEach((item) => {
    const content = getContent(item.filePath);
    var len = counter(content);
    var readingTime = readTime(len, cn, en);
    var wordsCount = 0;
    wordsCount = len[0] + len[1];
    if (wordsCount >= 1e3) {
      wordsCount = Math.round(wordsCount / 100) / 10 + "k";
    }
    const fileMatterObj = matter(content, {});
    const matterData = fileMatterObj.data;
    filesListWords.push({ ...item, wordsCount, readingTime, ...matterData });
  });
  return filesListWords;
}
function readTime(len, cn = 300, en = 160) {
  var readingTime = len[0] / cn + len[1] / en;
  if (readingTime > 60 && readingTime < 60 * 24) {
    let hour = parseInt(readingTime / 60);
    let minute = parseInt(readingTime - hour * 60);
    if (minute === 0) {
      return hour + "h";
    }
    return hour + "h" + minute + "m";
  } else if (readingTime > 60 * 24) {
    let day = parseInt(readingTime / (60 * 24));
    let hour = parseInt((readingTime - day * 24 * 60) / 60);
    if (hour === 0) {
      return day + "d";
    }
    return day + "d" + hour + "h";
  }
  return readingTime < 1 ? "1" : parseInt(readingTime * 10) / 10 + "m";
}
function getContent(filePath) {
  return fs.readFileSync(filePath, "utf8");
}
function counter(content) {
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
  const en = (content.replace(/[\u4E00-\u9FA5]/g, "").match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length;
  return [cn, en];
}
var log, docsRoot;
var init_readFile = __esm({
  "docs/.vuepress/webSiteInfo/readFile.ts"() {
    log = console.log;
    docsRoot = path.join("C:\\Users\\lcy\\Desktop\\vuepress-theme-vdoing\\docs\\.vuepress\\webSiteInfo", "..", "..", "..", "docs");
  }
});

// docs/.vuepress/config.ts
import { defineConfig4CustomTheme } from "vuepress/config";
import dayjs from "dayjs";

// docs/.vuepress/config/baiduCode.ts
var baiduCode_default = "503f098e7e5b3a5b5d8c5fc2938af002";

// docs/.vuepress/config/htmlModules.ts
var htmlModule = {};
var htmlModules_default = htmlModule;

// docs/.vuepress/config.ts
var { readFileList: readFileList2, readTotalFileWords: readTotalFileWords2, readEachFileWords: readEachFileWords2 } = (init_readFile(), __toCommonJS(readFile_exports));
var config_default = defineConfig4CustomTheme({
  theme: "vdoing",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Proto's blog",
      description: "web\u524D\u7AEF\u6280\u672F\u535A\u5BA2,\u4E13\u6CE8web\u524D\u7AEF\u5B66\u4E60\u4E0E\u603B\u7ED3\u3002JavaScript,js,ES6,TypeScript,vue,React,python,css3,html5,Node,git,github\u7B49\u6280\u672F\u6587\u7AE0\u3002"
    }
  },
  themeConfig: {
    nav: [
      { text: "\u9996\u9875", link: "/" },
      {
        text: "\u540E\u7AEF",
        link: "/code/",
        items: [
          {
            text: "Java",
            items: [
              {
                text: "Spring",
                link: "/pages/07c04a/"
              },
              {
                text: "JVM",
                link: "/pages/13793a/"
              }
            ]
          }
        ]
      },
      {
        text: "\u6570\u636E\u5E93",
        link: "/db/",
        items: [
          {
            text: "mysql",
            link: "/pages/78b014/"
          }
        ]
      },
      {
        text: "Linux",
        link: "/linux/",
        items: [
          { text: "criu", link: "/pages/1535e3/" },
          { text: "\u94F6\u6CB3\u9E92\u9E9F", link: "/pages/48490b/" }
        ]
      },
      {
        text: "\u4E91\u539F\u751F",
        link: "/pages/824495/",
        items: [
          { text: "K8S", link: "/pages/824495/" }
        ]
      },
      {
        text: "\u9006\u5411",
        link: "/reverse/",
        items: [
          {
            text: "\u6C47\u7F16"
          },
          {
            text: "WIN32"
          },
          {
            text: "PE"
          },
          {
            text: "\u786C\u7F16\u7801"
          }
        ]
      }
    ],
    sidebarDepth: 2,
    logo: "/img/PROTO.png",
    repo: "lichangyu2022",
    searchMaxSuggestions: 10,
    lastUpdated: "\u4E0A\u6B21\u66F4\u65B0",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "\u7F16\u8F91",
    blogInfo: {
      blogCreate: "2022-06-07",
      indexView: true,
      pageView: true,
      readingTime: true,
      eachFileWords: readEachFileWords2([""], 300, 160),
      mdFileCountType: "archives",
      totalWords: "archives",
      moutedEvent: ".tags-wrapper",
      indexIteration: 2500,
      pageIteration: 2500
    },
    sidebar: "structuring",
    author: {
      name: "Proto",
      link: "https://github.com/lichangyu2022"
    },
    blogger: {
      avatar: "/img/PROTO.png",
      name: "Proto",
      slogan: "45\xB0\u8EBA\u5E73\u9009\u624B"
    },
    social: {
      icons: [
        {
          iconClass: "icon-youjian",
          title: "\u53D1\u90AE\u4EF6",
          link: "mailto:lcyu18910064212@163.com"
        },
        {
          iconClass: "icon-github",
          title: "GitHub",
          link: "https://github.com/lichangyu2022"
        },
        {
          iconClass: "icon-erji",
          title: "\u542C\u97F3\u4E50",
          link: "https://music.163.com/#/playlist?id=755597173"
        }
      ]
    },
    extendFrontmatter: {
      author: {
        name: "Proto",
        link: "https://github.com/lichangyu2022"
      }
    },
    htmlModules: htmlModules_default
  },
  head: [
    ["link", { rel: "icon", href: "/img/PROTO.png" }],
    ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
    ["link", { rel: "stylesheet", href: "https://at.alicdn.com/t/font_3077305_pt8umhrn4k9.css" }],
    ["script", { src: "https://fastly.jsdelivr.net/npm/twikoo@1.4.18/dist/twikoo.all.min.js" }],
    [
      "meta",
      {
        name: "keywords",
        content: "\u540E\u7AEF\u535A\u5BA2,\u4E2A\u4EBA\u6280\u672F\u535A\u5BA2,\u540E\u7AEF,\u540E\u7AEF\u5F00\u53D1,\u540E\u7AEF\u6846\u67B6,\u6280\u672F\u6587\u6863,\u5B66\u4E60,\u9762\u8BD5,JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github,markdown"
      }
    ],
    ["meta", { name: "baidu-site-verification", content: "7F55weZDDc" }],
    ["meta", { name: "theme-color", content: "#11a8cd" }]
  ],
  plugins: [
    "vuepress-plugin-baidu-autopush",
    [
      "vuepress-plugin-baidu-tongji",
      {
        hm: baiduCode_default
      }
    ],
    [
      "thirdparty-search",
      {
        thirdparty: [
          {
            title: "\u5728MDN\u4E2D\u641C\u7D22",
            frontUrl: "https://developer.mozilla.org/zh-CN/search?q=",
            behindUrl: ""
          },
          {
            title: "\u5728Runoob\u4E2D\u641C\u7D22",
            frontUrl: "https://www.runoob.com/?s="
          },
          {
            title: "\u5728Vue API\u4E2D\u641C\u7D22",
            frontUrl: "https://cn.vuejs.org/v2/api/#"
          },
          {
            title: "\u5728Bing\u4E2D\u641C\u7D22",
            frontUrl: "https://cn.bing.com/search?q="
          },
          {
            title: "\u901A\u8FC7\u767E\u5EA6\u641C\u7D22\u672C\u7AD9\u7684",
            frontUrl: "https://www.baidu.com/s?wd=site%3Axugaoyi.com%20"
          }
        ]
      }
    ],
    [
      "one-click-copy",
      {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
        copyMessage: "\u590D\u5236\u6210\u529F",
        duration: 1e3,
        showInMobile: false
      }
    ],
    [
      "demo-block",
      {
        settings: {
          jsfiddle: false,
          codepen: true,
          horizontal: false
        }
      }
    ],
    [
      "vuepress-plugin-zooming",
      {
        selector: ".theme-vdoing-content img:not(.no-zoom)",
        options: {
          bgColor: "rgba(0,0,0,0.6)"
        }
      }
    ],
    [
      {
        name: "PageInfo-plugins",
        globalUIComponents: ["PageInfo"]
      }
    ],
    [
      {
        name: "Twikoo-plugins",
        globalUIComponents: ["Twikoo"]
      }
    ],
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          return dayjs(timestamp).format("YYYY/MM/DD, HH:mm:ss");
        }
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"]
  },
  extraWatchFiles: [
    ".vuepress/config.ts",
    ".vuepress/config/htmlModules.ts"
  ]
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3Mvd2ViU2l0ZUluZm8vcmVhZEZpbGUudHMiLCAiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL2NvbmZpZy9iYWlkdUNvZGUudHMiLCAiZG9jcy8udnVlcHJlc3MvY29uZmlnL2h0bWxNb2R1bGVzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgZnMgZnJvbSAnZnMnOyAvLyBcdTY1ODdcdTRFRjZcdTZBMjFcdTU3NTdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7IC8vIFx1OERFRlx1NUY4NFx1NkEyMVx1NTc1N1xyXG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJzsgLy8gRnJvbnRNYXR0ZXJcdTg5RTNcdTY3OTBcdTU2NjggaHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvZ3JheS1tYXR0ZXJcclxuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJyAvLyBcdTU0N0RcdTRFRTRcdTg4NENcdTYyNTNcdTUzNzBcdTdGOEVcdTUzMTZcclxuY29uc3QgbG9nID0gY29uc29sZS5sb2dcclxuY29uc3QgZG9jc1Jvb3QgPSBwYXRoLmpvaW4oXCJDOlxcXFxVc2Vyc1xcXFxsY3lcXFxcRGVza3RvcFxcXFx2dWVwcmVzcy10aGVtZS12ZG9pbmdcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcd2ViU2l0ZUluZm9cIiwgJy4uJywgJy4uJywgJy4uJywgJ2RvY3MnKTsgLy8gZG9jc1x1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFxyXG5cclxuLyoqXHJcbiAqIFx1ODNCN1x1NTNENlx1NjcyQ1x1N0FEOVx1NzY4NFx1NjU4N1x1N0FFMFx1NjU3MFx1NjM2RVxyXG4gKiBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTc2ODQgbWQgXHU2NTg3XHU2ODYzXHVGRjBDXHU1M0VGXHU0RUU1XHU2MzkyXHU5NjY0XHU2MzA3XHU1QjlBXHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0XHU2NTg3XHU2ODYzXHJcbiAqL1xyXG5mdW5jdGlvbiByZWFkRmlsZUxpc3QoZXhjbHVkZUZpbGVzID0gWycnXSwgZGlyID0gZG9jc1Jvb3QsIGZpbGVzTGlzdCA9IFtdKSB7XHJcbiAgICBjb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGRpcik7XHJcbiAgICBmaWxlcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBmaWxlUGF0aCA9IHBhdGguam9pbihkaXIsIGl0ZW0pO1xyXG4gICAgICAgIGNvbnN0IHN0YXQgPSBmcy5zdGF0U3luYyhmaWxlUGF0aCk7XHJcbiAgICAgICAgaWYgKCEoZXhjbHVkZUZpbGVzIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgICAgIGxvZyhjaGFsay55ZWxsb3coYGVycm9yOiBcdTRGMjBcdTUxNjVcdTc2ODRcdTUzQzJcdTY1NzBcdTRFMERcdTY2MkZcdTRFMDBcdTRFMkFcdTY1NzBcdTdFQzRcdTMwMDJgKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhjbHVkZUZpbGVzLmZvckVhY2goKGV4Y2x1ZGVGaWxlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkgJiYgaXRlbSAhPT0gJy52dWVwcmVzcycgJiYgaXRlbSAhPT0gJ0BwYWdlcycgJiYgaXRlbSAhPT0gZXhjbHVkZUZpbGUpIHtcclxuICAgICAgICAgICAgICAgIHJlYWRGaWxlTGlzdChleGNsdWRlRmlsZXMsIHBhdGguam9pbihkaXIsIGl0ZW0pLCBmaWxlc0xpc3QpOyAgLy9cdTkwMTJcdTVGNTJcdThCRkJcdTUzRDZcdTY1ODdcdTRFRjZcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXRoLmJhc2VuYW1lKGRpcikgIT09ICdkb2NzJykgeyAvLyBcdThGQzdcdTZFRTQgZG9jc1x1NzZFRVx1NUY1NVx1N0VBN1x1NEUwQlx1NzY4NFx1NjU4N1x1NEVGNlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlTmFtZUFyciA9IHBhdGguYmFzZW5hbWUoZmlsZVBhdGgpLnNwbGl0KCcuJylcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IG51bGwsIHR5cGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlTmFtZUFyci5sZW5ndGggPT09IDIpIHsgLy8gXHU2Q0ExXHU2NzA5XHU1RThGXHU1M0Y3XHU3Njg0XHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBmaWxlTmFtZUFyclswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gZmlsZU5hbWVBcnJbMV1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVOYW1lQXJyLmxlbmd0aCA9PT0gMykgeyAvLyBcdTY3MDlcdTVFOEZcdTUzRjdcdTc2ODRcdTY1ODdcdTRFRjZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IGZpbGVOYW1lQXJyWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBmaWxlTmFtZUFyclsyXVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIFx1OEQ4NVx1OEZDN1x1NEUyNFx1NEUyQVx1MjAxOC5cdTIwMTlcdTc2ODRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nKGNoYWxrLnllbGxvdyhgd2FybmluZzogXHU4QkU1XHU2NTg3XHU0RUY2IFwiJHtmaWxlUGF0aH1cIiBcdTZDQTFcdTY3MDlcdTYzMDlcdTcxNjdcdTdFQTZcdTVCOUFcdTU0N0RcdTU0MERcdUZGMENcdTVDMDZcdTVGRkRcdTc1NjVcdTc1MUZcdTYyMTBcdTc2RjhcdTVFOTRcdTY1NzBcdTYzNkVcdTMwMDJgKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnbWQnKSB7IC8vIFx1OEZDN1x1NkVFNFx1OTc1RSBtZCBcdTY1ODdcdTRFRjZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZmlsZXNMaXN0O1xyXG59XHJcbi8qKlxyXG4gKiBcdTgzQjdcdTUzRDZcdTY3MkNcdTdBRDlcdTc2ODRcdTY1ODdcdTdBRTBcdTYwM0JcdTVCNTdcdTY1NzBcclxuICogXHU1M0VGXHU0RUU1XHU2MzkyXHU5NjY0XHU2N0QwXHU0RTJBXHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0IG1kIFx1NjU4N1x1Njg2M1x1NUI1N1x1NjU3MFxyXG4gKi9cclxuZnVuY3Rpb24gcmVhZFRvdGFsRmlsZVdvcmRzKGV4Y2x1ZGVGaWxlcyA9IFsnJ10pIHtcclxuICAgIGNvbnN0IGZpbGVzTGlzdCA9IHJlYWRGaWxlTGlzdChleGNsdWRlRmlsZXMpO1xyXG4gICAgdmFyIHdvcmRDb3VudCA9IDA7XHJcbiAgICBmaWxlc0xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBnZXRDb250ZW50KGl0ZW0uZmlsZVBhdGgpO1xyXG4gICAgICAgIHZhciBsZW4gPSBjb3VudGVyKGNvbnRlbnQpO1xyXG4gICAgICAgIHdvcmRDb3VudCArPSBsZW5bMF0gKyBsZW5bMV07XHJcbiAgICB9KTtcclxuICAgIGlmICh3b3JkQ291bnQgPCAxMDAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHdvcmRDb3VudDtcclxuICAgIH1cclxuICAgIHJldHVybiBNYXRoLnJvdW5kKHdvcmRDb3VudCAvIDEwMCkgLyAxMCArICdrJztcclxufVxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU2QkNGXHU0RTAwXHU0RTJBXHU2NTg3XHU3QUUwXHU3Njg0XHU1QjU3XHU2NTcwXHJcbiAqIFx1NTNFRlx1NEVFNVx1NjM5Mlx1OTY2NFx1NjdEMFx1NEUyQVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCBtZCBcdTY1ODdcdTY4NjNcdTVCNTdcdTY1NzBcclxuICovXHJcbmZ1bmN0aW9uIHJlYWRFYWNoRmlsZVdvcmRzKGV4Y2x1ZGVGaWxlcyA9IFsnJ10sIGNuLCBlbikge1xyXG4gICAgY29uc3QgZmlsZXNMaXN0V29yZHMgPSBbXTtcclxuICAgIGNvbnN0IGZpbGVzTGlzdCA9IHJlYWRGaWxlTGlzdChleGNsdWRlRmlsZXMpO1xyXG4gICAgZmlsZXNMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBjb250ZW50ID0gZ2V0Q29udGVudChpdGVtLmZpbGVQYXRoKTtcclxuICAgICAgICB2YXIgbGVuID0gY291bnRlcihjb250ZW50KTtcclxuICAgICAgICAvLyBcdThCQTFcdTdCOTdcdTk4ODRcdThCQTFcdTc2ODRcdTk2MDVcdThCRkJcdTY1RjZcdTk1RjRcclxuICAgICAgICB2YXIgcmVhZGluZ1RpbWUgPSByZWFkVGltZShsZW4sIGNuLCBlbik7XHJcbiAgICAgICAgdmFyIHdvcmRzQ291bnQgPSAwO1xyXG4gICAgICAgIHdvcmRzQ291bnQgPSBsZW5bMF0gKyBsZW5bMV07XHJcbiAgICAgICAgaWYgKHdvcmRzQ291bnQgPj0gMTAwMCkge1xyXG4gICAgICAgICAgICB3b3Jkc0NvdW50ID0gTWF0aC5yb3VuZCh3b3Jkc0NvdW50IC8gMTAwKSAvIDEwICsgJ2snO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmaWxlTWF0dGVyT2JqID0+IHtjb250ZW50OidcdTUyNTRcdTk2NjRmcm9udG1hdHRlclx1NTQwRVx1NzY4NFx1NjU4N1x1NEVGNlx1NTE4NVx1NUJCOVx1NUI1N1x1N0IyNlx1NEUzMicsIGRhdGE6ezxmcm9udG1hdHRlclx1NUJGOVx1OEM2MT59LCAuLi59XHJcbiAgICAgICAgY29uc3QgZmlsZU1hdHRlck9iaiA9IG1hdHRlcihjb250ZW50LCB7fSk7XHJcbiAgICAgICAgY29uc3QgbWF0dGVyRGF0YSA9IGZpbGVNYXR0ZXJPYmouZGF0YTtcclxuICAgICAgICBmaWxlc0xpc3RXb3Jkcy5wdXNoKHsgLi4uaXRlbSwgd29yZHNDb3VudCwgcmVhZGluZ1RpbWUsIC4uLm1hdHRlckRhdGEgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmaWxlc0xpc3RXb3JkcztcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1OEJBMVx1N0I5N1x1OTg4NFx1OEJBMVx1NzY4NFx1OTYwNVx1OEJGQlx1NjVGNlx1OTVGNFxyXG4gKi9cclxuZnVuY3Rpb24gcmVhZFRpbWUobGVuLCBjbiA9IDMwMCwgZW4gPSAxNjApIHtcclxuICAgIHZhciByZWFkaW5nVGltZSA9IGxlblswXSAvIGNuICsgbGVuWzFdIC8gZW47XHJcbiAgICBpZiAocmVhZGluZ1RpbWUgPiA2MCAmJiByZWFkaW5nVGltZSA8IDYwICogMjQpIHsgICAvLyBcdTU5MjdcdTRFOEVcdTRFMDBcdTRFMkFcdTVDMEZcdTY1RjZcdUZGMENcdTVDMEZcdTRFOEVcdTRFMDBcdTU5MjlcclxuICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KHJlYWRpbmdUaW1lIC8gNjApO1xyXG4gICAgICAgIGxldCBtaW51dGUgPSBwYXJzZUludCgocmVhZGluZ1RpbWUgLSBob3VyICogNjApKTtcclxuICAgICAgICBpZiAobWludXRlID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBob3VyICsgJ2gnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaG91ciArICdoJyArIG1pbnV0ZSArICdtJztcclxuICAgIH0gZWxzZSBpZiAocmVhZGluZ1RpbWUgPiA2MCAqIDI0KSB7ICAgICAgLy8gXHU1OTI3XHU0RThFXHU0RTAwXHU1OTI5XHJcbiAgICAgICAgbGV0IGRheSA9IHBhcnNlSW50KHJlYWRpbmdUaW1lIC8gKDYwICogMjQpKTtcclxuICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KChyZWFkaW5nVGltZSAtIGRheSAqIDI0ICogNjApIC8gNjApO1xyXG4gICAgICAgIGlmIChob3VyID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXkgKyAnZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXkgKyAnZCcgKyBob3VyICsgJ2gnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlYWRpbmdUaW1lIDwgMSA/ICcxJyA6IHBhcnNlSW50KChyZWFkaW5nVGltZSAqIDEwKSkgLyAxMCArICdtJzsgICAvLyBcdTUzRDZcdTRFMDBcdTRGNERcdTVDMEZcdTY1NzBcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1OEJGQlx1NTNENlx1NjU4N1x1NEVGNlx1NTE4NVx1NUJCOVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29udGVudChmaWxlUGF0aCkge1xyXG4gICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcclxufVxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU2NTg3XHU0RUY2XHU1MTg1XHU1QkI5XHU3Njg0XHU1QjU3XHU2NTcwXHJcbiAqIGNuXHVGRjFBXHU0RTJEXHU2NTg3XHJcbiAqIGVuXHVGRjFBXHU0RTAwXHU2NTc0XHU1M0U1XHU4MkYxXHU2NTg3XHVGRjA4XHU2Q0ExXHU2NzA5XHU3QTdBXHU2ODNDXHU5Njk0XHU1RjAwXHU3Njg0XHU4MkYxXHU2NTg3XHU0RTNBIDEgXHU0RTJBXHVGRjA5XHJcbiAqL1xyXG5mdW5jdGlvbiBjb3VudGVyKGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IGNuID0gKGNvbnRlbnQubWF0Y2goL1tcXHU0RTAwLVxcdTlGQTVdL2cpIHx8IFtdKS5sZW5ndGg7XHJcbiAgICBjb25zdCBlbiA9IChjb250ZW50LnJlcGxhY2UoL1tcXHU0RTAwLVxcdTlGQTVdL2csICcnKS5tYXRjaCgvW2EtekEtWjAtOV9cXHUwMzkyLVxcdTAzYzlcXHUwNDAwLVxcdTA0RkZdK3xbXFx1NEUwMC1cXHU5RkZGXFx1MzQwMC1cXHU0ZGJmXFx1ZjkwMC1cXHVmYWZmXFx1MzA0MC1cXHUzMDlmXFx1YWMwMC1cXHVkN2FmXFx1MDQwMC1cXHUwNEZGXSt8W1xcdTAwRTRcXHUwMEM0XFx1MDBFNVxcdTAwQzVcXHUwMEY2XFx1MDBENl0rfFxcdysvZykgfHwgW10pLmxlbmd0aDtcclxuICAgIHJldHVybiBbY24sIGVuXTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIHJlYWRGaWxlTGlzdCxcclxuICAgIHJlYWRUb3RhbEZpbGVXb3JkcyxcclxuICAgIHJlYWRFYWNoRmlsZVdvcmRzLFxyXG59XHJcbiIsICIvKipcclxuICogXHU2M0QwXHU3OTNBXHVGRjFBXHU1OTgyXHU2MEE4XHU2MEYzXHU0RjdGXHU3NTI4SlNcdTcyNDhcdTY3MkNcdTc2ODRcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTUzRUZcdTUzQzJcdTgwMDNcdUZGMUFodHRwczovL2dpdGh1Yi5jb20veHVnYW95aS92dWVwcmVzcy10aGVtZS12ZG9pbmcvdHJlZS9hMmYwM2U5OTNkZDJmMmEzYWZkYzU3Y2Y3MmFkZmM2ZjFiNmIwYzMyL2RvY3MvLnZ1ZXByZXNzXHJcbiAqL1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnNEN1c3RvbVRoZW1lLCBVc2VyUGx1Z2lucyB9IGZyb20gJ3Z1ZXByZXNzL2NvbmZpZydcclxuaW1wb3J0IHsgVmRvaW5nVGhlbWVDb25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS12ZG9pbmcvdHlwZXMnXHJcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcydcclxuaW1wb3J0IGJhaWR1Q29kZSBmcm9tICcuL2NvbmZpZy9iYWlkdUNvZGUnIC8vIFx1NzY3RVx1NUVBNlx1N0VERlx1OEJBMWhtXHU3ODAxXHJcbmltcG9ydCBodG1sTW9kdWxlcyBmcm9tICcuL2NvbmZpZy9odG1sTW9kdWxlcycgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU2M0QyXHU1MTY1XHU3Njg0aHRtbFx1NTc1N1xyXG5pbXBvcnQgeyBVc2VyUGx1Z2lucyB9IGZyb20gJ3Z1ZXByZXNzL2NvbmZpZydcclxuXHJcbmNvbnN0IHsgcmVhZEZpbGVMaXN0LCByZWFkVG90YWxGaWxlV29yZHMsIHJlYWRFYWNoRmlsZVdvcmRzIH0gPSByZXF1aXJlKCcuL3dlYlNpdGVJbmZvL3JlYWRGaWxlJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWc0Q3VzdG9tVGhlbWU8VmRvaW5nVGhlbWVDb25maWc+KHtcclxuICB0aGVtZTogJ3Zkb2luZycsIC8vIFx1NEY3Rlx1NzUyOG5wbVx1NEUzQlx1OTg5OFx1NTMwNVxyXG4gIC8vIHRoZW1lOiByZXNvbHZlKFwiQzpcXFxcVXNlcnNcXFxcbGN5XFxcXERlc2t0b3BcXFxcdnVlcHJlc3MtdGhlbWUtdmRvaW5nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXCIsICcuLi8uLi92ZG9pbmcnKSwgLy8gXHU0RjdGXHU3NTI4XHU2NzJDXHU1NzMwXHU0RTNCXHU5ODk4XHU1MzA1XHJcblxyXG4gIGxvY2FsZXM6IHtcclxuICAgICcvJzoge1xyXG4gICAgICBsYW5nOiAnemgtQ04nLFxyXG4gICAgICB0aXRsZTogXCJQcm90bydzIGJsb2dcIixcclxuICAgICAgZGVzY3JpcHRpb246ICd3ZWJcdTUyNERcdTdBRUZcdTYyODBcdTY3MkZcdTUzNUFcdTVCQTIsXHU0RTEzXHU2Q0U4d2ViXHU1MjREXHU3QUVGXHU1QjY2XHU0RTYwXHU0RTBFXHU2MDNCXHU3RUQzXHUzMDAySmF2YVNjcmlwdCxqcyxFUzYsVHlwZVNjcmlwdCx2dWUsUmVhY3QscHl0aG9uLGNzczMsaHRtbDUsTm9kZSxnaXQsZ2l0aHViXHU3QjQ5XHU2MjgwXHU2NzJGXHU2NTg3XHU3QUUwXHUzMDAyJyxcclxuICAgIH1cclxuICB9LFxyXG4gIC8vIGJhc2U6ICcvJywgLy8gXHU5RUQ4XHU4QkE0Jy8nXHUzMDAyXHU1OTgyXHU2NzlDXHU0RjYwXHU2MEYzXHU1QzA2XHU0RjYwXHU3Njg0XHU3RjUxXHU3QUQ5XHU5MEU4XHU3RjcyXHU1MjMwXHU1OTgyIGh0dHBzOi8vZm9vLmdpdGh1Yi5pby9iYXIvXHVGRjBDXHU5MEEzXHU0RTQ4IGJhc2UgXHU1RTk0XHU4QkU1XHU4OEFCXHU4QkJFXHU3RjZFXHU2MjEwIFwiL2Jhci9cIixcdUZGMDhcdTU0MjZcdTUyMTlcdTk4NzVcdTk3NjJcdTVDMDZcdTU5MzFcdTUzQkJcdTY4MzdcdTVGMEZcdTdCNDlcdTY1ODdcdTRFRjZcdUZGMDlcclxuXHJcbiAgLy8gXHU0RTNCXHU5ODk4XHU5MTREXHU3RjZFXHJcbiAgdGhlbWVDb25maWc6IHtcclxuICAgIC8vIFx1NUJGQ1x1ODIyQVx1OTE0RFx1N0Y2RVxyXG4gICAgbmF2OiBbXHJcbiAgICAgIHsgdGV4dDogJ1x1OTk5Nlx1OTg3NScsIGxpbms6ICcvJyB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1NTQwRVx1N0FFRicsXHJcbiAgICAgICAgbGluazogJy9jb2RlLycsIC8vXHU3NkVFXHU1RjU1XHU5ODc1XHU5NEZFXHU2M0E1XHVGRjBDXHU2QjY0XHU1OTA0bGlua1x1NjYyRnZkb2luZ1x1NEUzQlx1OTg5OFx1NjVCMFx1NTg5RVx1NzY4NFx1OTE0RFx1N0Y2RVx1OTg3OVx1RkYwQ1x1NjcwOVx1NEU4Q1x1N0VBN1x1NUJGQ1x1ODIyQVx1NjVGNlx1RkYwQ1x1NTNFRlx1NEVFNVx1NzBCOVx1NTFGQlx1NEUwMFx1N0VBN1x1NUJGQ1x1ODIyQVx1OERGM1x1NTIzMFx1NzZFRVx1NUY1NVx1OTg3NVxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdKYXZhJyxcclxuICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3ByaW5nJyxcclxuICAgICAgICAgICAgICAgIGxpbms6ICcvcGFnZXMvMDdjMDRhLydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICdKVk0nLFxyXG4gICAgICAgICAgICAgICAgbGluazogJy9wYWdlcy8xMzc5M2EvJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1NjU3MFx1NjM2RVx1NUU5MycsXHJcbiAgICAgICAgbGluazogJy9kYi8nLCAvL1x1NzZFRVx1NUY1NVx1OTg3NVx1OTRGRVx1NjNBNVx1RkYwQ1x1NkI2NFx1NTkwNGxpbmtcdTY2MkZ2ZG9pbmdcdTRFM0JcdTk4OThcdTY1QjBcdTU4OUVcdTc2ODRcdTkxNERcdTdGNkVcdTk4NzlcdUZGMENcdTY3MDlcdTRFOENcdTdFQTdcdTVCRkNcdTgyMkFcdTY1RjZcdUZGMENcdTUzRUZcdTRFRTVcdTcwQjlcdTUxRkJcdTRFMDBcdTdFQTdcdTVCRkNcdTgyMkFcdThERjNcdTUyMzBcdTc2RUVcdTVGNTVcdTk4NzVcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiAnbXlzcWwnLFxyXG4gICAgICAgICAgICBsaW5rOiAnL3BhZ2VzLzc4YjAxNC8nXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ0xpbnV4JyxcclxuICAgICAgICBsaW5rOiAnL2xpbnV4LycsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgeyB0ZXh0OiAnY3JpdScsIGxpbms6ICcvcGFnZXMvMTUzNWUzLycgfSxcclxuICAgICAgICAgeyB0ZXh0OiAnXHU5NEY2XHU2Q0IzXHU5RTkyXHU5RTlGJywgbGluazogJy9wYWdlcy80ODQ5MGIvJyB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTRFOTFcdTUzOUZcdTc1MUYnLFxyXG4gICAgICAgIGxpbms6ICcvcGFnZXMvODI0NDk1LycsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICB7IHRleHQ6ICdLOFMnLCBsaW5rOiAnL3BhZ2VzLzgyNDQ5NS8nIH0sXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1OTAwNlx1NTQxMScsXHJcbiAgICAgICAgbGluazogJy9yZXZlcnNlLycsIC8vXHU3NkVFXHU1RjU1XHU5ODc1XHU5NEZFXHU2M0E1XHVGRjBDXHU2QjY0XHU1OTA0bGlua1x1NjYyRnZkb2luZ1x1NEUzQlx1OTg5OFx1NjVCMFx1NTg5RVx1NzY4NFx1OTE0RFx1N0Y2RVx1OTg3OVx1RkYwQ1x1NjcwOVx1NEU4Q1x1N0VBN1x1NUJGQ1x1ODIyQVx1NjVGNlx1RkYwQ1x1NTNFRlx1NEVFNVx1NzBCOVx1NTFGQlx1NEUwMFx1N0VBN1x1NUJGQ1x1ODIyQVx1OERGM1x1NTIzMFx1NzZFRVx1NUY1NVx1OTg3NVxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdcdTZDNDdcdTdGMTYnLFxyXG4gICAgICAgICAgICAvL2xpbms6ICcvcGFnZXMvMDdjMDRhLycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiAnV0lOMzInLFxyXG4gICAgICAgICAgICAvL2xpbms6ICcvcGFnZXMvMDdjMDRhLycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiAnUEUnLFxyXG4gICAgICAgICAgICAvL2xpbms6ICcvcGFnZXMvMDdjMDRhLycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiAnXHU3ODZDXHU3RjE2XHU3ODAxJyxcclxuICAgICAgICAgICAgLy9saW5rOiAnL3BhZ2VzLzA3YzA0YS8nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgc2lkZWJhckRlcHRoOiAyLCAvLyBcdTRGQTdcdThGQjlcdTY4MEZcdTY2M0VcdTc5M0FcdTZERjFcdTVFQTZcdUZGMENcdTlFRDhcdThCQTQxXHVGRjBDXHU2NzAwXHU1OTI3Mlx1RkYwOFx1NjYzRVx1NzkzQVx1NTIzMGgzXHU2ODA3XHU5ODk4XHVGRjA5XHJcbiAgICBsb2dvOiAnL2ltZy9QUk9UTy5wbmcnLCAvLyBcdTVCRkNcdTgyMkFcdTY4MEZsb2dvXHJcbiAgICByZXBvOiAnbGljaGFuZ3l1MjAyMicsIC8vIFx1NUJGQ1x1ODIyQVx1NjgwRlx1NTNGM1x1NEZBN1x1NzUxRlx1NjIxMEdpdGh1Ylx1OTRGRVx1NjNBNVxyXG4gICAgc2VhcmNoTWF4U3VnZ2VzdGlvbnM6IDEwLCAvLyBcdTY0MUNcdTdEMjJcdTdFRDNcdTY3OUNcdTY2M0VcdTc5M0FcdTY3MDBcdTU5MjdcdTY1NzBcclxuICAgIGxhc3RVcGRhdGVkOiAnXHU0RTBBXHU2QjIxXHU2NkY0XHU2NUIwJywgLy8gXHU1RjAwXHU1NDJGXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0XHVGRjBDXHU1RTc2XHU5MTREXHU3RjZFXHU1MjREXHU3RjAwXHU2NTg3XHU1QjU3ICAgc3RyaW5nIHwgYm9vbGVhbiAoXHU1M0Q2XHU1MDNDXHU0RTNBZ2l0XHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0KVxyXG4gICAgZG9jc0RpcjogJ2RvY3MnLCAvLyBcdTdGMTZcdThGOTFcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MzlcclxuICAgIC8vIGRvY3NCcmFuY2g6ICdtYXN0ZXInLCAvLyBcdTdGMTZcdThGOTFcdTc2ODRcdTY1ODdcdTRFRjZcdTYyNDBcdTU3MjhcdTUyMDZcdTY1MkZcdUZGMENcdTlFRDhcdThCQTRtYXN0ZXJcdTMwMDIgXHU2Q0U4XHU2MTBGXHVGRjFBXHU1OTgyXHU2NzlDXHU0RjYwXHU3Njg0XHU1MjA2XHU2NTJGXHU2NjJGbWFpblx1NTIxOVx1NEZFRVx1NjUzOVx1NEUzQW1haW5cclxuICAgIGVkaXRMaW5rczogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4XHU3RjE2XHU4RjkxXHJcbiAgICBlZGl0TGlua1RleHQ6ICdcdTdGMTZcdThGOTEnLFxyXG5cclxuICAgIC8vIFx1N0FEOVx1NzBCOVx1OTE0RFx1N0Y2RVx1RkYwOFx1OTk5Nlx1OTg3NSAmIFx1NjU4N1x1N0FFMFx1OTg3NVx1RkYwOVxyXG4gICAgYmxvZ0luZm86IHtcclxuICAgICAgYmxvZ0NyZWF0ZTogJzIwMjItMDYtMDcnLCAvLyBcdTUzNUFcdTVCQTJcdTUyMUJcdTVFRkFcdTY1RjZcdTk1RjRcclxuICAgICAgaW5kZXhWaWV3OiB0cnVlLCAgLy8gXHU1RjAwXHU1NDJGXHU5OTk2XHU5ODc1XHU3Njg0XHU4QkJGXHU5NUVFXHU5MUNGXHU1NDhDXHU2MzkyXHU1NDBEXHU3RURGXHU4QkExXHVGRjBDXHU5RUQ4XHU4QkE0IHRydWVcdUZGMDhcdTVGMDBcdTU0MkZcdUZGMDlcclxuICAgICAgcGFnZVZpZXc6IHRydWUsICAvLyBcdTVGMDBcdTU0MkZcdTY1ODdcdTdBRTBcdTk4NzVcdTc2ODRcdTZENEZcdTg5QzhcdTkxQ0ZcdTdFREZcdThCQTFcdUZGMENcdTlFRDhcdThCQTQgdHJ1ZVx1RkYwOFx1NUYwMFx1NTQyRlx1RkYwOVxyXG4gICAgICByZWFkaW5nVGltZTogdHJ1ZSwgIC8vIFx1NUYwMFx1NTQyRlx1NjU4N1x1N0FFMFx1OTg3NVx1NzY4NFx1OTg4NFx1OEJBMVx1OTYwNVx1OEJGQlx1NjVGNlx1OTVGNFx1RkYwQ1x1Njc2MVx1NEVGNlx1RkYxQVx1NUYwMFx1NTQyRiBlYWNoRmlsZVdvcmRzXHVGRjBDXHU5RUQ4XHU4QkE0IHRydWVcdUZGMDhcdTVGMDBcdTU0MkZcdUZGMDlcdTMwMDJcdTUzRUZcdTU3MjggZWFjaEZpbGVXb3JkcyBcdTc2ODQgcmVhZEVhY2hGaWxlV29yZHMgXHU3Njg0XHU3QjJDXHU0RThDXHU0RTJBXHU1NDhDXHU3QjJDXHU0RTA5XHU0RTJBXHU1M0MyXHU2NTcwXHU4MUVBXHU1QjlBXHU0RTQ5XHVGRjBDXHU5RUQ4XHU4QkE0IDEgXHU1MjA2XHU5NDlGIDMwMCBcdTRFMkRcdTY1ODdcdTMwMDExNjAgXHU4MkYxXHU2NTg3XHJcbiAgICAgIGVhY2hGaWxlV29yZHM6IHJlYWRFYWNoRmlsZVdvcmRzKFsnJ10sIDMwMCwgMTYwKSwgIC8vIFx1NUYwMFx1NTQyRlx1NkJDRlx1NEUyQVx1NjU4N1x1N0FFMFx1OTg3NVx1NzY4NFx1NUI1N1x1NjU3MFx1MzAwMnJlYWRFYWNoRmlsZVdvcmRzKFsneHgnXSkgXHU1MTczXHU5NUVEIHh4IFx1NzZFRVx1NUY1NVx1RkYwOFx1NTNFRlx1NTkxQVx1NEUyQVx1RkYwQ1x1NTNFRlx1NEUwRFx1NEYyMFx1NTNDMlx1NjU3MFx1RkYwOVx1NEUwQlx1NzY4NFx1NjU4N1x1N0FFMFx1OTg3NVx1NUI1N1x1NjU3MFx1NTQ4Q1x1OTYwNVx1OEJGQlx1NjVGNlx1OTU3Rlx1RkYwQ1x1NTQwRVx1OTc2Mlx1NEUyNFx1NEUyQVx1NTNDMlx1NjU3MFx1NTIwNlx1NTIyQlx1NjYyRiAxIFx1NTIwNlx1OTQ5Rlx1OTFDQ1x1ODBGRFx1OTYwNVx1OEJGQlx1NzY4NFx1NEUyRFx1NjU4N1x1NUI1N1x1NjU3MFx1NTQ4Q1x1ODJGMVx1NjU4N1x1NUI1N1x1NjU3MFx1MzAwMlx1NjVFMFx1OUVEOFx1OEJBNFx1NTAzQ1x1MzAwMnJlYWRFYWNoRmlsZVdvcmRzKCkgXHU2NUI5XHU2Q0Q1XHU5RUQ4XHU4QkE0XHU2MzkyXHU5NjY0XHU0RTg2IGFydGljbGUgXHU0RTNBIGZhbHNlIFx1NzY4NFx1NjU4N1x1N0FFMFxyXG4gICAgICBtZEZpbGVDb3VudFR5cGU6ICdhcmNoaXZlcycsICAvLyBcdTVGMDBcdTU0MkZcdTY1ODdcdTY4NjNcdTY1NzBcdTMwMDIxLiBhcmNoaXZlcyBcdTgzQjdcdTUzRDZcdTVGNTJcdTY4NjNcdTc2ODRcdTY1ODdcdTY4NjNcdTY1NzBcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdTMwMDIyLiBcdTY1NzBcdTdFQzQgcmVhZEZpbGVMaXN0KFsneHgnXSkgXHU2MzkyXHU5NjY0IHh4IFx1NzZFRVx1NUY1NVx1RkYwOFx1NTNFRlx1NTkxQVx1NEUyQVx1RkYwQ1x1NTNFRlx1NEUwRFx1NEYyMFx1NTNDMlx1NjU3MFx1RkYwOVx1RkYwQ1x1ODNCN1x1NTNENlx1NTE3Nlx1NEVENlx1NzZFRVx1NUY1NVx1NzY4NFx1NjU4N1x1Njg2M1x1NjU3MFx1MzAwMlx1NjNEMFx1NzkzQVx1RkYxQXJlYWRGaWxlTGlzdCgpIFx1ODNCN1x1NTNENiBkb2NzIFx1NEUwQlx1NjI0MFx1NjcwOVx1NzY4NCBtZCBcdTY1ODdcdTY4NjNcdUZGMDhcdTk2NjRcdTRFODYgYC52dWVwcmVzc2AgXHU1NDhDIGBAcGFnZXNgIFx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NFx1NjU4N1x1Njg2M1x1RkYwOVxyXG4gICAgICB0b3RhbFdvcmRzOiAnYXJjaGl2ZXMnLCAgLy8gXHU1RjAwXHU1NDJGXHU2NzJDXHU3QUQ5XHU2NTg3XHU2ODYzXHU2MDNCXHU1QjU3XHU2NTcwXHUzMDAyMS4gYXJjaGl2ZXMgXHU4M0I3XHU1M0Q2XHU1RjUyXHU2ODYzXHU3Njg0XHU2NTg3XHU2ODYzXHU2NTcwXHVGRjA4XHU0RjdGXHU3NTI4IGFyY2hpdmVzIFx1Njc2MVx1NEVGNlx1RkYxQVx1NEYyMFx1NTE2NSBlYWNoRmlsZVdvcmRzXHVGRjBDXHU1NDI2XHU1MjE5XHU2MkE1XHU5NTE5XHVGRjA5XHUzMDAyMi4gcmVhZFRvdGFsRmlsZVdvcmRzKFsneHgnXSkgXHU2MzkyXHU5NjY0IHh4IFx1NzZFRVx1NUY1NVx1RkYwOFx1NTNFRlx1NTkxQVx1NEUyQVx1RkYwQ1x1NTNFRlx1NEUwRFx1NEYyMFx1NTNDMlx1NjU3MFx1RkYwOVx1RkYwQ1x1ODNCN1x1NTNENlx1NTE3Nlx1NEVENlx1NzZFRVx1NUY1NVx1NzY4NFx1NjU4N1x1N0FFMFx1NUI1N1x1NjU3MFx1MzAwMlx1NjVFMFx1OUVEOFx1OEJBNFx1NTAzQ1xyXG4gICAgICBtb3V0ZWRFdmVudDogJy50YWdzLXdyYXBwZXInLCAgIC8vIFx1OTk5Nlx1OTg3NVx1NzY4NFx1N0FEOVx1NzBCOVx1NkEyMVx1NTc1N1x1NjMwMlx1OEY3RFx1NTcyOFx1NjdEMFx1NEUyQVx1NTE0M1x1N0QyMFx1NTQwRVx1OTc2Mlx1RkYwOFx1NjUyRlx1NjMwMVx1NTkxQVx1NzlDRFx1OTAwOVx1NjJFOVx1NTY2OFx1RkYwOVx1RkYwQ1x1NjMwN1x1NzY4NFx1NjYyRlx1NjMwMlx1OEY3RFx1NTcyOFx1NTRFQVx1NEUyQVx1NTE0NFx1NUYxRlx1NTE0M1x1N0QyMFx1NzY4NFx1NTQwRVx1OTc2Mlx1RkYwQ1x1OUVEOFx1OEJBNFx1NjYyRlx1NzBFRFx1OTVFOFx1NjgwN1x1N0I3RSAnLnRhZ3Mtd3JhcHBlcicgXHU0RTBCXHU5NzYyXHVGRjBDXHU2M0QwXHU3OTNBXHVGRjFBJy5jYXRlZ29yaWVzLXdyYXBwZXInIFx1NEYxQVx1NjMwMlx1OEY3RFx1NTcyOFx1NjU4N1x1N0FFMFx1NTIwNlx1N0M3Qlx1NEUwQlx1OTc2Mlx1MzAwMicuYmxvZ2dlci13cmFwcGVyJyBcdTRGMUFcdTYzMDJcdThGN0RcdTU3MjhcdTUzNUFcdTVCQTJcdTU5MzRcdTUwQ0ZcdTZBMjFcdTU3NTdcdTRFMEJcdTk3NjJcclxuICAgICAgLy8gXHU0RTBCXHU5NzYyXHU0RTI0XHU0RTJBXHU5MDA5XHU5ODc5XHVGRjFBXHU3QjJDXHU0RTAwXHU2QjIxXHU4M0I3XHU1M0Q2XHU4QkJGXHU5NUVFXHU5MUNGXHU1OTMxXHU4RDI1XHU1NDBFXHU3Njg0XHU4RkVEXHU0RUUzXHU2NUY2XHU5NUY0XHJcbiAgICAgIGluZGV4SXRlcmF0aW9uOiAyNTAwLCAgIC8vIFx1NTk4Mlx1Njc5Q1x1OTk5Nlx1OTg3NVx1ODNCN1x1NTNENlx1OEJCRlx1OTVFRVx1OTFDRlx1NTkzMVx1OEQyNVx1RkYwQ1x1NTIxOVx1NkJDRlx1OTY5NFx1NTkxQVx1NUMxMVx1NjVGNlx1OTVGNFx1NTQwRVx1ODNCN1x1NTNENlx1NEUwMFx1NkIyMVx1OEJCRlx1OTVFRVx1OTFDRlx1RkYwQ1x1NzZGNFx1NTIzMFx1ODNCN1x1NTNENlx1NjIxMFx1NTI5Rlx1NjIxNlx1ODNCN1x1NTNENiAxMCBcdTZCMjFcdTU0MEVcdTMwMDJcdTlFRDhcdThCQTQgMyBcdTc5RDJcdTMwMDJcdTZDRThcdTYxMEZcdUZGMUFcdThCQkVcdTdGNkVcdTY1RjZcdTk1RjRcdTU5MkFcdTRGNEVcdUZGMENcdTUzRUZcdTgwRkRcdTVCRkNcdTgxRjRcdThCQkZcdTk1RUVcdTkxQ0YgKyAyXHUzMDAxKyAzIC4uLi4uLlxyXG4gICAgICBwYWdlSXRlcmF0aW9uOiAyNTAwLCAgICAvLyBcdTU5ODJcdTY3OUNcdTY1ODdcdTdBRTBcdTk4NzVcdTgzQjdcdTUzRDZcdThCQkZcdTk1RUVcdTkxQ0ZcdTU5MzFcdThEMjVcdUZGMENcdTUyMTlcdTZCQ0ZcdTk2OTRcdTU5MUFcdTVDMTFcdTY1RjZcdTk1RjRcdTU0MEVcdTgzQjdcdTUzRDZcdTRFMDBcdTZCMjFcdThCQkZcdTk1RUVcdTkxQ0ZcdUZGMENcdTc2RjRcdTUyMzBcdTgzQjdcdTUzRDZcdTYyMTBcdTUyOUZcdTYyMTZcdTgzQjdcdTUzRDYgMTAgXHU2QjIxXHU1NDBFXHUzMDAyXHU5RUQ4XHU4QkE0IDMgXHU3OUQyXHUzMDAyXHU2Q0U4XHU2MTBGXHVGRjFBXHU4QkJFXHU3RjZFXHU2NUY2XHU5NUY0XHU1OTJBXHU0RjRFXHVGRjBDXHU1M0VGXHU4MEZEXHU1QkZDXHU4MUY0XHU4QkJGXHU5NUVFXHU5MUNGICsgMlx1MzAwMSsgMyAuLi4uLi5cclxuICAgICAgLy8gXHU4QkY0XHU2NjBFXHVGRjFBXHU2MjEwXHU1MjlGXHU4M0I3XHU1M0Q2XHU0RTAwXHU2QjIxXHU4QkJGXHU5NUVFXHU5MUNGXHVGRjBDXHU4QkJGXHU5NUVFXHU5MUNGICsgMVx1RkYwQ1x1NjI0MFx1NEVFNVx1N0IyQ1x1NEUwMFx1NkIyMVx1ODNCN1x1NTNENlx1NTkzMVx1OEQyNVx1NTQwRVx1RkYwQ1x1OEJCRVx1N0Y2RVx1NzY4NFx1NkJDRlx1NEUyQVx1OTY5NFx1NkJCNVx1OTFDRFx1NjVCMFx1ODNCN1x1NTNENlx1NjVGNlx1OTVGNFx1RkYwQ1x1NUMwNlx1NEYxQVx1NUY3MVx1NTRDRFx1OEJCRlx1OTVFRVx1OTFDRlx1NzY4NFx1NkIyMVx1NjU3MFx1MzAwMlx1NTk4MiAxMDAgXHU1M0VGXHU4MEZEXHU2QkNGXHU2QjIxXHU4M0I3XHU1M0Q2XHU4QkJGXHU5NUVFXHU5MUNGICsgM1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyoqKiBcdTRFRTVcdTRFMEJcdTY2MkZWZG9pbmdcdTRFM0JcdTk4OThcdTc2RjhcdTUxNzNcdTkxNERcdTdGNkVcdUZGMENcdTY1ODdcdTY4NjNcdUZGMUFodHRwczovL2RvYy54dWdhb3lpLmNvbS9wYWdlcy9hMjBjZTgvICoqKi8vXHJcblxyXG4gICAgLy8gY2F0ZWdvcnk6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTYyNTNcdTVGMDBcdTUyMDZcdTdDN0JcdTUyOUZcdTgwRkRcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcbiAgICAvLyB0YWc6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTYyNTNcdTVGMDBcdTY4MDdcdTdCN0VcdTUyOUZcdTgwRkRcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcbiAgICAvLyBhcmNoaXZlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2MjUzXHU1RjAwXHU1RjUyXHU2ODYzXHU1MjlGXHU4MEZEXHVGRjBDXHU5RUQ4XHU4QkE0dHJ1ZVxyXG4gICAgLy8gY2F0ZWdvcnlUZXh0OiAnXHU5NjhGXHU3QjE0JywgLy8gXHU3ODhFXHU3MjQ3XHU1MzE2XHU2NTg3XHU3QUUwXHVGRjA4X3Bvc3RzXHU2NTg3XHU0RUY2XHU1OTM5XHU3Njg0XHU2NTg3XHU3QUUwXHVGRjA5XHU5ODg0XHU4QkJFXHU3NTFGXHU2MjEwXHU3Njg0XHU1MjA2XHU3QzdCXHU1MDNDXHVGRjBDXHU5RUQ4XHU4QkE0J1x1OTY4Rlx1N0IxNCdcclxuXHJcbiAgICAvLyBwYWdlU3R5bGU6ICdsaW5lJywgLy8gXHU5ODc1XHU5NzYyXHU5OENFXHU2ODNDXHVGRjBDXHU1M0VGXHU5MDA5XHU1MDNDXHVGRjFBJ2NhcmQnXHU1MzYxXHU3MjQ3IHwgJ2xpbmUnIFx1N0VCRlx1RkYwOFx1NjcyQVx1OEJCRVx1N0Y2RWJvZHlCZ0ltZ1x1NjVGNlx1NjI0RFx1NzUxRlx1NjU0OFx1RkYwOVx1RkYwQyBcdTlFRDhcdThCQTQnY2FyZCdcdTMwMDIgXHU4QkY0XHU2NjBFXHVGRjFBY2FyZFx1NjVGNlx1ODBDQ1x1NjY2Rlx1NjYzRVx1NzkzQVx1NzA3MFx1ODI3Mlx1ODg2Q1x1NjI1OFx1NTFGQVx1NTM2MVx1NzI0N1x1NjgzN1x1NUYwRlx1RkYwQ2xpbmVcdTY1RjZcdTgwQ0NcdTY2NkZcdTY2M0VcdTc5M0FcdTdFQUZcdTgyNzJcdUZGMENcdTVFNzZcdTRFMTRcdTkwRThcdTUyMDZcdTZBMjFcdTU3NTdcdTVFMjZcdTdFQkZcdTY3NjFcdThGQjlcdTY4NDZcclxuXHJcbiAgICAvLyBib2R5QmdJbWc6IFtcclxuICAgIC8vICAgJ2h0dHBzOi8vZmFzdGx5LmpzZGVsaXZyLm5ldC9naC94dWdhb3lpL2ltYWdlX3N0b3JlL2Jsb2cvMjAyMDA1MDcxNzU4MjguanBlZycsXHJcbiAgICAvLyAgICdodHRwczovL2Zhc3RseS5qc2RlbGl2ci5uZXQvZ2gveHVnYW95aS9pbWFnZV9zdG9yZS9ibG9nLzIwMjAwNTA3MTc1ODQ1LmpwZWcnLFxyXG4gICAgLy8gICAnaHR0cHM6Ly9mYXN0bHkuanNkZWxpdnIubmV0L2doL3h1Z2FveWkvaW1hZ2Vfc3RvcmUvYmxvZy8yMDIwMDUwNzE3NTg0Ni5qcGVnJ1xyXG4gICAgLy8gXSwgLy8gYm9keVx1ODBDQ1x1NjY2Rlx1NTkyN1x1NTZGRVx1RkYwQ1x1OUVEOFx1OEJBNFx1NjVFMFx1MzAwMiBcdTUzNTVcdTVGMjBcdTU2RkVcdTcyNDcgU3RyaW5nIHwgXHU1OTFBXHU1RjIwXHU1NkZFXHU3MjQ3IEFycmF5LCBcdTU5MUFcdTVGMjBcdTU2RkVcdTcyNDdcdTY1RjZcdTk2OTRib2R5QmdJbWdJbnRlcnZhbFx1NTIwN1x1NjM2Mlx1NEUwMFx1NUYyMFx1MzAwMlxyXG4gICAgLy8gYm9keUJnSW1nT3BhY2l0eTogMC41LCAvLyBib2R5XHU4MENDXHU2NjZGXHU1NkZFXHU5MDBGXHU2NjBFXHU1RUE2XHVGRjBDXHU5MDA5XHU1MDNDIDAuMX4xLjAsIFx1OUVEOFx1OEJBNDAuNVxyXG4gICAgLy8gYm9keUJnSW1nSW50ZXJ2YWw6IDE1LCAvLyBib2R5XHU1OTFBXHU1RjIwXHU4MENDXHU2NjZGXHU1NkZFXHU2NUY2XHU3Njg0XHU1MjA3XHU2MzYyXHU5NUY0XHU5Njk0LCBcdTlFRDhcdThCQTQxNVx1RkYwQ1x1NTM1NVx1NEY0RHNcclxuICAgIC8vIHRpdGxlQmFkZ2U6IGZhbHNlLCAvLyBcdTY1ODdcdTdBRTBcdTY4MDdcdTk4OThcdTUyNERcdTc2ODRcdTU2RkVcdTY4MDdcdTY2MkZcdTU0MjZcdTY2M0VcdTc5M0FcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcbiAgICAvLyB0aXRsZUJhZGdlSWNvbnM6IFsgLy8gXHU2NTg3XHU3QUUwXHU2ODA3XHU5ODk4XHU1MjREXHU1NkZFXHU2ODA3XHU3Njg0XHU1NzMwXHU1NzQwXHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTNCXHU5ODk4XHU1MTg1XHU3RjZFXHU1NkZFXHU2ODA3XHJcbiAgICAvLyAgICdcdTU2RkVcdTY4MDdcdTU3MzBcdTU3NDAxJyxcclxuICAgIC8vICAgJ1x1NTZGRVx1NjgwN1x1NTczMFx1NTc0MDInXHJcbiAgICAvLyBdLFxyXG4gICAgLy8gY29udGVudEJnU3R5bGU6IDEsIC8vIFx1NjU4N1x1N0FFMFx1NTE4NVx1NUJCOVx1NTc1N1x1NzY4NFx1ODBDQ1x1NjY2Rlx1OThDRVx1NjgzQ1x1RkYwQ1x1OUVEOFx1OEJBNFx1NjVFMC4gMSBcdTY1QjlcdTY4M0MgfCAyIFx1NkEyQVx1N0VCRiB8IDMgXHU3QUQ2XHU3RUJGIHwgNCBcdTVERTZcdTY1OUNcdTdFQkYgfCA1IFx1NTNGM1x1NjU5Q1x1N0VCRiB8IDYgXHU3MEI5XHU3MkI2XHJcblxyXG4gICAgLy8gdXBkYXRlQmFyOiB7IC8vIFx1NjcwMFx1OEZEMVx1NjZGNFx1NjVCMFx1NjgwRlxyXG4gICAgLy8gICBzaG93VG9BcnRpY2xlOiBmYWxzZSwgLy8gXHU2NjNFXHU3OTNBXHU1MjMwXHU2NTg3XHU3QUUwXHU5ODc1XHU1RTk1XHU5MEU4XHVGRjBDXHU5RUQ4XHU4QkE0dHJ1ZVxyXG4gICAgLy8gICBtb3JlQXJ0aWNsZTogJy9hcmNoaXZlcycgLy8gXHUyMDFDXHU2NkY0XHU1OTFBXHU2NTg3XHU3QUUwXHUyMDFEXHU4REYzXHU4RjZDXHU3Njg0XHU5ODc1XHU5NzYyXHVGRjBDXHU5RUQ4XHU4QkE0Jy9hcmNoaXZlcydcclxuICAgIC8vIH0sXHJcbiAgICAvLyByaWdodE1lbnVCYXI6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTY2M0VcdTc5M0FcdTUzRjNcdTRGQTdcdTY1ODdcdTdBRTBcdTU5MjdcdTdFQjJcdTY4MEZcdUZGMENcdTlFRDhcdThCQTR0cnVlIChcdTVDNEZcdTVCQkRcdTVDMEZcdTRFOEUxMzAwcHhcdTRFMEJcdTY1RTBcdThCQkFcdTU5ODJcdTRGNTVcdTkwRkRcdTRFMERcdTY2M0VcdTc5M0EpXHJcbiAgICAvLyBzaWRlYmFyT3BlbjogZmFsc2UsIC8vIFx1NTIxRFx1NTlDQlx1NzJCNlx1NjAwMVx1NjYyRlx1NTQyNlx1NjI1M1x1NUYwMFx1NURFNlx1NEZBN1x1OEZCOVx1NjgwRlx1RkYwQ1x1OUVEOFx1OEJBNHRydWVcclxuICAgIC8vIHBhZ2VCdXR0b246IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTY2M0VcdTc5M0FcdTVGRUJcdTYzNzdcdTdGRkJcdTk4NzVcdTYzMDlcdTk0QUVcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcblxyXG4gICAgLy8gXHU5RUQ4XHU4QkE0XHU1OTE2XHU4OUMyXHU2QTIxXHU1RjBGXHVGRjA4XHU3NTI4XHU2MjM3XHU2NzJBXHU1NzI4XHU5ODc1XHU5NzYyXHU2MjRCXHU1MkE4XHU0RkVFXHU2NTM5XHU4RkM3XHU2QTIxXHU1RjBGXHU2NUY2XHU2MjREXHU3NTFGXHU2NTQ4XHVGRjBDXHU1NDI2XHU1MjE5XHU0RUU1XHU3NTI4XHU2MjM3XHU4QkJFXHU3RjZFXHU3Njg0XHU2QTIxXHU1RjBGXHU0RTNBXHU1MUM2XHVGRjA5XHVGRjBDXHU1M0VGXHU5MDA5XHVGRjFBJ2F1dG8nIHwgJ2xpZ2h0JyB8ICdkYXJrJyB8ICdyZWFkJ1x1RkYwQ1x1OUVEOFx1OEJBNCdhdXRvJ1x1MzAwMlxyXG4gICAgLy8gZGVmYXVsdE1vZGU6ICdhdXRvJyxcclxuXHJcbiAgICAvLyBcdTRGQTdcdThGQjlcdTY4MEYgICdzdHJ1Y3R1cmluZycgfCB7IG1vZGU6ICdzdHJ1Y3R1cmluZycsIGNvbGxhcHNhYmxlOiBCb29sZWFufSB8ICdhdXRvJyB8IDxcdTgxRUFcdTVCOUFcdTRFNDk+ICAgIFx1NkUyOVx1OTlBOFx1NjNEMFx1NzkzQVx1RkYxQVx1NzZFRVx1NUY1NVx1OTg3NVx1NjU3MFx1NjM2RVx1NEY5RFx1OEQ1Nlx1NEU4RVx1N0VEM1x1Njc4NFx1NTMxNlx1NzY4NFx1NEZBN1x1OEZCOVx1NjgwRlx1NjU3MFx1NjM2RVx1RkYwQ1x1NTk4Mlx1Njc5Q1x1NEY2MFx1NEUwRFx1OEJCRVx1N0Y2RVx1NEUzQSdzdHJ1Y3R1cmluZycsXHU1QzA2XHU2NUUwXHU2Q0Q1XHU0RjdGXHU3NTI4XHU3NkVFXHU1RjU1XHU5ODc1XHJcbiAgICBzaWRlYmFyOiAnc3RydWN0dXJpbmcnLFxyXG5cclxuICAgIC8vIFx1NjU4N1x1N0FFMFx1OUVEOFx1OEJBNFx1NzY4NFx1NEY1Q1x1ODAwNVx1NEZFMVx1NjA2Rlx1RkYwQyhcdTUzRUZcdTU3MjhtZFx1NjU4N1x1NEVGNlx1NEUyRFx1NTM1NVx1NzJFQ1x1OTE0RFx1N0Y2RVx1NkI2NFx1NEZFMVx1NjA2Rikgc3RyaW5nIHwge25hbWU6IHN0cmluZywgbGluaz86IHN0cmluZ31cclxuICAgIGF1dGhvcjoge1xyXG4gICAgICBuYW1lOiAnUHJvdG8nLCAvLyBcdTVGQzVcdTk3MDBcclxuICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9saWNoYW5neXUyMDIyJywgLy8gXHU1M0VGXHU5MDA5XHU3Njg0XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFx1NTM1QVx1NEUzQlx1NEZFMVx1NjA2RiAoXHU2NjNFXHU3OTNBXHU1NzI4XHU5OTk2XHU5ODc1XHU0RkE3XHU4RkI5XHU2ODBGKVxyXG4gICAgYmxvZ2dlcjoge1xyXG4gICAgICBhdmF0YXI6ICcvaW1nL1BST1RPLnBuZycsXHJcbiAgICAgIG5hbWU6ICdQcm90bycsXHJcbiAgICAgIHNsb2dhbjogJzQ1XHUwMEIwXHU4RUJBXHU1RTczXHU5MDA5XHU2MjRCJyxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU3OTNFXHU0RUE0XHU1NkZFXHU2ODA3IChcdTY2M0VcdTc5M0FcdTRFOEVcdTUzNUFcdTRFM0JcdTRGRTFcdTYwNkZcdTY4MEZcdTU0OENcdTk4NzVcdTgxMUFcdTY4MEZcdTMwMDJcdTUxODVcdTdGNkVcdTU2RkVcdTY4MDdcdUZGMUFodHRwczovL2RvYy54dWdhb3lpLmNvbS9wYWdlcy9hMjBjZTgvI3NvY2lhbClcclxuICAgIHNvY2lhbDoge1xyXG4gICAgICAvLyBpY29uZm9udENzc0ZpbGU6ICcvL2F0LmFsaWNkbi5jb20vdC94eHguY3NzJywgLy8gXHU1M0VGXHU5MDA5XHVGRjBDXHU5NjNGXHU5MUNDXHU1NkZFXHU2ODA3XHU1RTkzXHU1NzI4XHU3RUJGY3NzXHU2NTg3XHU0RUY2XHU1NzMwXHU1NzQwXHVGRjBDXHU1QkY5XHU0RThFXHU0RTNCXHU5ODk4XHU2Q0ExXHU2NzA5XHU3Njg0XHU1NkZFXHU2ODA3XHU1M0VGXHU4MUVBXHU1REYxXHU2REZCXHU1MkEwXHUzMDAyXHU5NjNGXHU5MUNDXHU1NkZFXHU3MjQ3XHU1RTkzXHVGRjFBaHR0cHM6Ly93d3cuaWNvbmZvbnQuY24vXHJcbiAgICAgIGljb25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbkNsYXNzOiAnaWNvbi15b3VqaWFuJyxcclxuICAgICAgICAgIHRpdGxlOiAnXHU1M0QxXHU5MEFFXHU0RUY2JyxcclxuICAgICAgICAgIGxpbms6ICdtYWlsdG86bGN5dTE4OTEwMDY0MjEyQDE2My5jb20nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbkNsYXNzOiAnaWNvbi1naXRodWInLFxyXG4gICAgICAgICAgdGl0bGU6ICdHaXRIdWInLFxyXG4gICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9saWNoYW5neXUyMDIyJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb25DbGFzczogJ2ljb24tZXJqaScsXHJcbiAgICAgICAgICB0aXRsZTogJ1x1NTQyQ1x1OTdGM1x1NEU1MCcsXHJcbiAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9tdXNpYy4xNjMuY29tLyMvcGxheWxpc3Q/aWQ9NzU1NTk3MTczJyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBcdTk4NzVcdTgxMUFcdTRGRTFcdTYwNkZcclxuICAvKiAgZm9vdGVyOiB7XHJcbiAgICAgIGNyZWF0ZVllYXI6IDIwMjIsIC8vIFx1NTM1QVx1NUJBMlx1NTIxQlx1NUVGQVx1NUU3NFx1NEVGRFxyXG4gICAgICBjb3B5cmlnaHRJbmZvOlxyXG4gICAgICAgICdQcm90byB8IDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vbGljaGFuZ3l1MjAyMi92dWVwcmVzcy10aGVtZS12ZG9pbmcvYmxvYi9tYXN0ZXIvTElDRU5TRVwiIHRhcmdldD1cIl9ibGFua1wiPk1JVCBMaWNlbnNlPC9hPicsIC8vIFx1NTM1QVx1NUJBMlx1NzI0OFx1Njc0M1x1NEZFMVx1NjA2Rlx1RkYwQ1x1NjUyRlx1NjMwMWFcdTY4MDdcdTdCN0VcdTYyMTZcdTYzNjJcdTg4NENcdTY4MDdcdTdCN0U8L2JyPlxyXG4gICAgfSxcclxuKi9cclxuICAgIC8vIFx1NjI2OVx1NUM1NVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMGZyb250bWF0dGVyXHUzMDAyXHVGRjA4XHU1RjUzbWRcdTY1ODdcdTRFRjZcdTc2ODRmcm9udG1hdHRlclx1NEUwRFx1NUI1OFx1NTcyOFx1NzZGOFx1NUU5NFx1NzY4NFx1NUI1N1x1NkJCNVx1NjVGNlx1NUMwNlx1ODFFQVx1NTJBOFx1NkRGQlx1NTJBMFx1MzAwMlx1NEUwRFx1NEYxQVx1ODk4Nlx1NzZENlx1NURGMlx1NjcwOVx1NzY4NFx1NjU3MFx1NjM2RVx1MzAwMlx1RkYwOVxyXG4gICAgZXh0ZW5kRnJvbnRtYXR0ZXI6IHtcclxuICAgICAgYXV0aG9yOiB7XHJcbiAgICAgICAgbmFtZTogJ1Byb3RvJyxcclxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2xpY2hhbmd5dTIwMjInXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5aG10bChcdTVFN0ZcdTU0NEEpXHU2QTIxXHU1NzU3XHJcbiAgICBodG1sTW9kdWxlc1xyXG4gIH0sXHJcblxyXG4gIC8vIFx1NkNFOFx1NTE2NVx1NTIzMFx1OTg3NVx1OTc2MjxoZWFkPlx1NEUyRFx1NzY4NFx1NjgwN1x1N0I3RVx1RkYwQ1x1NjgzQ1x1NUYwRlt0YWdOYW1lLCB7IGF0dHJOYW1lOiBhdHRyVmFsdWUgfSwgaW5uZXJIVE1MP11cclxuICBoZWFkOiBbXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnL2ltZy9QUk9UTy5wbmcnIH1dLCAvL2Zhdmljb25zXHVGRjBDXHU4RDQ0XHU2RTkwXHU2NTNFXHU1NzI4cHVibGljXHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICdyZWZlcnJlcicsIGNvbnRlbnQ6ICduby1yZWZlcnJlci13aGVuLWRvd25ncmFkZScgfV0sXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ3N0eWxlc2hlZXQnLCBocmVmOiAnaHR0cHM6Ly9hdC5hbGljZG4uY29tL3QvZm9udF8zMDc3MzA1X3B0OHVtaHJuNGs5LmNzcycgfV0sXHJcbiAgICBbJ3NjcmlwdCcsIHsgc3JjOiAnaHR0cHM6Ly9mYXN0bHkuanNkZWxpdnIubmV0L25wbS90d2lrb29AMS40LjE4L2Rpc3QvdHdpa29vLmFsbC5taW4uanMnIH1dLFxyXG5cclxuICAgIFsnbWV0YScsIHtcclxuICAgICAgICBuYW1lOiAna2V5d29yZHMnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdcdTU0MEVcdTdBRUZcdTUzNUFcdTVCQTIsXHU0RTJBXHU0RUJBXHU2MjgwXHU2NzJGXHU1MzVBXHU1QkEyLFx1NTQwRVx1N0FFRixcdTU0MEVcdTdBRUZcdTVGMDBcdTUzRDEsXHU1NDBFXHU3QUVGXHU2ODQ2XHU2N0I2LFx1NjI4MFx1NjcyRlx1NjU4N1x1Njg2MyxcdTVCNjZcdTRFNjAsXHU5NzYyXHU4QkQ1LEphdmFTY3JpcHQsanMsRVM2LFR5cGVTY3JpcHQsdnVlLHB5dGhvbixjc3MzLGh0bWw1LE5vZGUsZ2l0LGdpdGh1YixtYXJrZG93bicsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAnYmFpZHUtc2l0ZS12ZXJpZmljYXRpb24nLCBjb250ZW50OiAnN0Y1NXdlWkREYycgfV0sIC8vIFx1NzY3RVx1NUVBNlx1N0VERlx1OEJBMVx1NzY4NFx1N0FEOVx1OTU3Rlx1OUE4Q1x1OEJDMVx1RkYwOFx1NEY2MFx1NTNFRlx1NEVFNVx1NTNCQlx1NjM4OVx1RkYwOVxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAndGhlbWUtY29sb3InLCBjb250ZW50OiAnIzExYThjZCcgfV0sIC8vIFx1NzlGQlx1NTJBOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NEUzQlx1OTg5OFx1OTg5Q1x1ODI3MlxyXG4gICAgLy8gW1xyXG4gICAgLy8gICAnc2NyaXB0JyxcclxuICAgIC8vICAge1xyXG4gICAgLy8gICAgICdkYXRhLWFkLWNsaWVudCc6ICdjYS1wdWItNzgyODMzMzcyNTk5MzU1NCcsXHJcbiAgICAvLyAgICAgYXN5bmM6ICdhc3luYycsXHJcbiAgICAvLyAgICAgc3JjOiAnaHR0cHM6Ly9wYWdlYWQyLmdvb2dsZXN5bmRpY2F0aW9uLmNvbS9wYWdlYWQvanMvYWRzYnlnb29nbGUuanMnLFxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gXSwgLy8gXHU3RjUxXHU3QUQ5XHU1MTczXHU4MDU0R29vZ2xlIEFkU2Vuc2UgXHU0RTBFIGh0bWxcdTY4M0NcdTVGMEZcdTVFN0ZcdTU0NEFcdTY1MkZcdTYzMDFcdUZGMDhcdTRGNjBcdTUzRUZcdTRFRTVcdTUzQkJcdTYzODlcdUZGMDlcclxuICBdLFxyXG5cclxuXHJcbiAgLy8gXHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXHJcbiAgcGx1Z2luczogPFVzZXJQbHVnaW5zPltcclxuXHJcbiAgICAndnVlcHJlc3MtcGx1Z2luLWJhaWR1LWF1dG9wdXNoJywgLy8gXHU3NjdFXHU1RUE2XHU4MUVBXHU1MkE4XHU2M0E4XHU5MDAxXHJcblxyXG4gICAgW1xyXG4gICAgICAndnVlcHJlc3MtcGx1Z2luLWJhaWR1LXRvbmdqaScsIC8vIFx1NzY3RVx1NUVBNlx1N0VERlx1OEJBMVxyXG4gICAgICB7XHJcbiAgICAgICAgaG06IGJhaWR1Q29kZSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcblxyXG4gICAgLy8gXHU1MTY4XHU2NTg3XHU2NDFDXHU3RDIyXHUzMDAyIFx1MjZBMFx1RkUwRlx1NkNFOFx1NjEwRlx1RkYxQVx1NkI2NFx1NjNEMlx1NEVGNlx1NEYxQVx1NTcyOFx1NjI1M1x1NUYwMFx1N0Y1MVx1N0FEOVx1NjVGNlx1NTkxQVx1NTJBMFx1OEY3RFx1OTBFOFx1NTIwNmpzXHU2NTg3XHU0RUY2XHU3NTI4XHU0RThFXHU2NDFDXHU3RDIyXHVGRjBDXHU1QkZDXHU4MUY0XHU1MjFEXHU2QjIxXHU4QkJGXHU5NUVFXHU3RjUxXHU3QUQ5XHU1M0Q4XHU2MTYyXHUzMDAyXHU1OTgyXHU1NzI4XHU2MTBGXHU1MjFEXHU2QjIxXHU4QkJGXHU5NUVFXHU5MDFGXHU1RUE2XHU3Njg0XHU4QkREXHU1M0VGXHU0RUU1XHU0RTBEXHU0RjdGXHU3NTI4XHU2QjY0XHU2M0QyXHU0RUY2XHVGRjAxXHVGRjA4XHU2M0E4XHU4MzUwXHVGRjFBdnVlcHJlc3MtcGx1Z2luLXRoaXJkcGFydHktc2VhcmNoXHVGRjA5XHJcbiAgICAvLyAnZnVsbHRleHQtc2VhcmNoJyxcclxuXHJcbiAgICAvLyBcdTUzRUZcdTRFRTVcdTZERkJcdTUyQTBcdTdCMkNcdTRFMDlcdTY1QjlcdTY0MUNcdTdEMjJcdTk0RkVcdTYzQTVcdTc2ODRcdTY0MUNcdTdEMjJcdTY4NDZcdUZGMDhcdTdFRTdcdTYyN0ZcdTUzOUZcdTVCOThcdTY1QjlcdTY0MUNcdTdEMjJcdTY4NDZcdTc2ODRcdTkxNERcdTdGNkVcdTUzQzJcdTY1NzBcdUZGMDlcclxuICAgIFtcclxuICAgICAgJ3RoaXJkcGFydHktc2VhcmNoJyxcclxuICAgICAge1xyXG4gICAgICAgIHRoaXJkcGFydHk6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdcdTU3MjhNRE5cdTRFMkRcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICBmcm9udFVybDogJ2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL3NlYXJjaD9xPScsIC8vIFx1NjQxQ1x1N0QyMlx1OTRGRVx1NjNBNVx1NzY4NFx1NTI0RFx1OTc2Mlx1OTBFOFx1NTIwNlxyXG4gICAgICAgICAgICBiZWhpbmRVcmw6ICcnLCAvLyBcdTY0MUNcdTdEMjJcdTk0RkVcdTYzQTVcdTc2ODRcdTU0MEVcdTk3NjJcdTkwRThcdTUyMDZcdUZGMENcdTUzRUZcdTkwMDlcdUZGMENcdTlFRDhcdThCQTQgJydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnXHU1NzI4UnVub29iXHU0RTJEXHU2NDFDXHU3RDIyJyxcclxuICAgICAgICAgICAgZnJvbnRVcmw6ICdodHRwczovL3d3dy5ydW5vb2IuY29tLz9zPScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1x1NTcyOFZ1ZSBBUElcdTRFMkRcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICBmcm9udFVybDogJ2h0dHBzOi8vY24udnVlanMub3JnL3YyL2FwaS8jJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnXHU1NzI4QmluZ1x1NEUyRFx1NjQxQ1x1N0QyMicsXHJcbiAgICAgICAgICAgIGZyb250VXJsOiAnaHR0cHM6Ly9jbi5iaW5nLmNvbS9zZWFyY2g/cT0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdcdTkwMUFcdThGQzdcdTc2N0VcdTVFQTZcdTY0MUNcdTdEMjJcdTY3MkNcdTdBRDlcdTc2ODQnLFxyXG4gICAgICAgICAgICBmcm9udFVybDogJ2h0dHBzOi8vd3d3LmJhaWR1LmNvbS9zP3dkPXNpdGUlM0F4dWdhb3lpLmNvbSUyMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH1cclxuICAgIF0sXHJcblxyXG4gICAgW1xyXG4gICAgICAnb25lLWNsaWNrLWNvcHknLCAvLyBcdTRFRTNcdTc4MDFcdTU3NTdcdTU5MERcdTUyMzZcdTYzMDlcdTk0QUVcclxuICAgICAge1xyXG4gICAgICAgIGNvcHlTZWxlY3RvcjogWydkaXZbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHByZScsICdkaXZbY2xhc3MqPVwiYXNpZGUtY29kZVwiXSBhc2lkZSddLCAvLyBTdHJpbmcgb3IgQXJyYXlcclxuICAgICAgICBjb3B5TWVzc2FnZTogJ1x1NTkwRFx1NTIzNlx1NjIxMFx1NTI5RicsIC8vIGRlZmF1bHQgaXMgJ0NvcHkgc3VjY2Vzc2Z1bGx5IGFuZCB0aGVuIHBhc3RlIGl0IGZvciB1c2UuJ1xyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLCAvLyBwcm9tcHQgbWVzc2FnZSBkaXNwbGF5IHRpbWUuXHJcbiAgICAgICAgc2hvd0luTW9iaWxlOiBmYWxzZSwgLy8gd2hldGhlciB0byBkaXNwbGF5IG9uIHRoZSBtb2JpbGUgc2lkZSwgZGVmYXVsdDogZmFsc2UuXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG5cclxuICAgIFtcclxuICAgICAgJ2RlbW8tYmxvY2snLCAvLyBkZW1vXHU2RjE0XHU3OTNBXHU2QTIxXHU1NzU3IGh0dHBzOi8vZ2l0aHViLmNvbS94aWd1YXhpZ3VhL3Z1ZXByZXNzLXBsdWdpbi1kZW1vLWJsb2NrXHJcbiAgICAgIHtcclxuICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgLy8ganNMaWI6IFsnaHR0cDovL3h4eCddLCAvLyBcdTU3MjhcdTdFQkZcdTc5M0FcdTRGOEIoanNmaWRkbGUsIGNvZGVwZW4pXHU0RTJEXHU3Njg0anNcdTRGOURcdThENTZcclxuICAgICAgICAgIC8vIGNzc0xpYjogWydodHRwOi8veHh4J10sIC8vIFx1NTcyOFx1N0VCRlx1NzkzQVx1NEY4Qlx1NEUyRFx1NzY4NGNzc1x1NEY5RFx1OEQ1NlxyXG4gICAgICAgICAgLy8gdnVlOiAnaHR0cHM6Ly9mYXN0bHkuanNkZWxpdnIubmV0L25wbS92dWUvZGlzdC92dWUubWluLmpzJywgLy8gXHU1NzI4XHU3RUJGXHU3OTNBXHU0RjhCXHU0RTJEXHU3Njg0dnVlXHU0RjlEXHU4RDU2XHJcbiAgICAgICAgICBqc2ZpZGRsZTogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQSBqc2ZpZGRsZSBcdTk0RkVcdTYzQTVcclxuICAgICAgICAgIGNvZGVwZW46IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQSBjb2RlcGVuIFx1OTRGRVx1NjNBNVxyXG4gICAgICAgICAgaG9yaXpvbnRhbDogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NUM1NVx1NzkzQVx1NEUzQVx1NkEyQVx1NTQxMVx1NjgzN1x1NUYwRlxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW1xyXG4gICAgICAndnVlcHJlc3MtcGx1Z2luLXpvb21pbmcnLCAvLyBcdTY1M0VcdTU5MjdcdTU2RkVcdTcyNDdcclxuICAgICAge1xyXG4gICAgICAgIHNlbGVjdG9yOiAnLnRoZW1lLXZkb2luZy1jb250ZW50IGltZzpub3QoLm5vLXpvb20pJywgLy8gXHU2MzkyXHU5NjY0Y2xhc3NcdTY2MkZuby16b29tXHU3Njg0XHU1NkZFXHU3MjQ3XHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgYmdDb2xvcjogJ3JnYmEoMCwwLDAsMC42KScsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAnUGFnZUluZm8tcGx1Z2lucycsXHJcbiAgICAgICAgZ2xvYmFsVUlDb21wb25lbnRzOiBbXCJQYWdlSW5mb1wiXSAvLyAyLnggXHU3MjQ4XHU2NzJDIGdsb2JhbFVJQ29tcG9uZW50cyBcdTY1MzlcdTU0MERcdTRFM0EgY2xpZW50QXBwUm9vdENvbXBvbmVudEZpbGVzXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAnVHdpa29vLXBsdWdpbnMnLFxyXG4gICAgICAgIGdsb2JhbFVJQ29tcG9uZW50czogW1wiVHdpa29vXCJdIC8vIDIueCBcdTcyNDhcdTY3MkMgZ2xvYmFsVUlDb21wb25lbnRzIFx1NjUzOVx1NTQwRFx1NEUzQSBjbGllbnRBcHBSb290Q29tcG9uZW50RmlsZXNcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgLyogW1xyXG4gICAgICAndnVlcHJlc3MtcGx1Z2luLWNvbW1lbnQnLCAvLyBcdThCQzRcdThCQkFcclxuICAgICAge1xyXG4gICAgICAgIGNob29zZW46ICdnaXRhbGsnLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgIGNsaWVudElEOiAnOGE4N2UwZGRhNTRkYzMzZWVkNzInLFxyXG4gICAgICAgICAgY2xpZW50U2VjcmV0OiAnYmIwNTdkMzEyMjJlOGI0YzMyMmYyZWJiZTBlOWQ3Y2JkY2JiN2YyZCcsXHJcbiAgICAgICAgICByZXBvOiAndGVzdGJsb2cnLCAvLyBHaXRIdWIgXHU0RUQzXHU1RTkzXHJcbiAgICAgICAgICBvd25lcjogJ2xpY2hhbmd5dTIwMjInLCAvLyBHaXRIdWJcdTRFRDNcdTVFOTNcdTYyNDBcdTY3MDlcdTgwMDVcclxuICAgICAgICAgIGFkbWluOiBbJ1Byb3RvJ10sIC8vIFx1NUJGOVx1NEVEM1x1NUU5M1x1NjcwOVx1NTE5OVx1Njc0M1x1OTY1MFx1NzY4NFx1NEVCQVxyXG4gICAgICAgICAgLy8gZGlzdHJhY3Rpb25GcmVlTW9kZTogdHJ1ZSxcclxuICAgICAgICAgIHBhZ2VyRGlyZWN0aW9uOiAnbGFzdCcsIC8vICdmaXJzdCdcdTZCNjNcdTVFOEYgfCAnbGFzdCdcdTUwMTJcdTVFOEZcclxuICAgICAgICAgIGlkOiAnPCUtIChmcm9udG1hdHRlci5wZXJtYWxpbmsgfHwgZnJvbnRtYXR0ZXIudG8ucGF0aCkuc2xpY2UoLTE2KSAlPicsIC8vICBcdTk4NzVcdTk3NjJcdTc2ODRcdTU1MkZcdTRFMDBcdTY4MDdcdThCQzYsXHU5NTdGXHU1RUE2XHU0RTBEXHU4MEZEXHU4RDg1XHU4RkM3NTBcclxuICAgICAgICAgIHRpdGxlOiAnXHUzMDBDXHU4QkM0XHU4QkJBXHUzMDBEPCUtIGZyb250bWF0dGVyLnRpdGxlICU+JywgLy8gR2l0SHViIGlzc3VlIFx1NzY4NFx1NjgwN1x1OTg5OFxyXG4gICAgICAgICAgbGFiZWxzOiBbJ0dpdGFsaycsICdDb21tZW50J10sIC8vIEdpdEh1YiBpc3N1ZSBcdTc2ODRcdTY4MDdcdTdCN0VcclxuICAgICAgICAgIGJvZHk6XHJcbiAgICAgICAgICAgICdcdTk4NzVcdTk3NjJcdUZGMUE8JS0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIChmcm9udG1hdHRlci50by5wYXRoIHx8IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkgJT4nLCAvLyBHaXRIdWIgaXNzdWUgXHU3Njg0XHU1MTg1XHU1QkI5XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sKi9cclxuICAgIFtcclxuICAgICAgJ0B2dWVwcmVzcy9sYXN0LXVwZGF0ZWQnLCAvLyBcIlx1NEUwQVx1NkIyMVx1NjZGNFx1NjVCMFwiXHU2NUY2XHU5NUY0XHU2ODNDXHU1RjBGXHJcbiAgICAgIHtcclxuICAgICAgICB0cmFuc2Zvcm1lcjogKHRpbWVzdGFtcCwgbGFuZykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGRheWpzKHRpbWVzdGFtcCkuZm9ybWF0KCdZWVlZL01NL0RELCBISDptbTpzcycpXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgXSxcclxuXHJcbiAgbWFya2Rvd246IHtcclxuICAgIGxpbmVOdW1iZXJzOiB0cnVlLFxyXG4gICAgZXh0cmFjdEhlYWRlcnM6IFsnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXSwgLy8gXHU2M0QwXHU1M0Q2XHU2ODA3XHU5ODk4XHU1MjMwXHU0RkE3XHU4RkI5XHU2ODBGXHU3Njg0XHU3RUE3XHU1MjJCXHVGRjBDXHU5RUQ4XHU4QkE0WydoMicsICdoMyddXHJcbiAgfSxcclxuXHJcbiAgLy8gXHU3NkQxXHU1NDJDXHU2NTg3XHU0RUY2XHU1M0Q4XHU1MzE2XHU1RTc2XHU5MUNEXHU2NUIwXHU2Nzg0XHU1RUZBXHJcbiAgZXh0cmFXYXRjaEZpbGVzOiBbXHJcbiAgICAnLnZ1ZXByZXNzL2NvbmZpZy50cycsXHJcbiAgICAnLnZ1ZXByZXNzL2NvbmZpZy9odG1sTW9kdWxlcy50cycsXHJcbiAgXVxyXG59KVxyXG4iLCAiZXhwb3J0IGRlZmF1bHQgJzUwM2YwOThlN2U1YjNhNWI1ZDhjNWZjMjkzOGFmMDAyJ1xyXG4iLCAiaW1wb3J0IHsgVmRvaW5nVGhlbWVDb25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS12ZG9pbmcvdHlwZXMnXHJcblxyXG4vKiogXHU2M0QyXHU1MTY1XHU4MUVBXHU1QjlBXHU0RTQ5aHRtbFx1NkEyMVx1NTc1NyAoXHU1M0VGXHU3NTI4XHU0RThFXHU2M0QyXHU1MTY1XHU1RTdGXHU1NDRBXHU2QTIxXHU1NzU3XHU3QjQ5KVxyXG4gKiB7XHJcbiAqICAgaG9tZVNpZGViYXJCOiBodG1sU3RyaW5nLCBcdTk5OTZcdTk4NzVcdTRGQTdcdThGQjlcdTY4MEZcdTVFOTVcdTkwRThcclxuICpcclxuICogICBzaWRlYmFyVDogaHRtbFN0cmluZywgXHU2MjQwXHU2NzA5XHU1REU2XHU0RkE3XHU4RkI5XHU2ODBGXHU5ODc2XHU5MEU4XHJcbiAqICAgc2lkZWJhckI6IGh0bWxTdHJpbmcsIFx1NjI0MFx1NjcwOVx1NURFNlx1NEZBN1x1OEZCOVx1NjgwRlx1NUU5NVx1OTBFOFxyXG4gKlxyXG4gKiAgIHBhZ2VUOiBodG1sU3RyaW5nLCBcdTk4NzVcdTk3NjJcdTk4NzZcdTkwRThcclxuICogICBwYWdlQjogaHRtbFN0cmluZywgXHU5ODc1XHU5NzYyXHU1RTk1XHU5MEU4XHJcbiAqICAgcGFnZVRzaG93TW9kZTogc3RyaW5nLCBcdTk4NzVcdTk3NjJcdTk4NzZcdTkwRTgtXHU2NjNFXHU3OTNBXHU2NUI5XHU1RjBGXHVGRjFBXHU2NzJBXHU5MTREXHU3RjZFXHU5RUQ4XHU4QkE0XHU2MjQwXHU2NzA5XHU5ODc1XHU5NzYyXHVGRjFCJ2FydGljbGUnID0+IFx1NEVDNVx1NjU4N1x1N0FFMFx1OTg3NVx1MjQ2MFx1RkYxQiAnY3VzdG9tJyA9PiBcdTRFQzVcdTgxRUFcdTVCOUFcdTRFNDlcdTk4NzVcdTI0NjBcclxuICogICBwYWdlQnNob3dNb2RlOiBzdHJpbmcsIFx1OTg3NVx1OTc2Mlx1NUU5NVx1OTBFOC1cdTY2M0VcdTc5M0FcdTY1QjlcdTVGMEZcdUZGMUFcdTY3MkFcdTkxNERcdTdGNkVcdTlFRDhcdThCQTRcdTYyNDBcdTY3MDlcdTk4NzVcdTk3NjJcdUZGMUInYXJ0aWNsZScgPT4gXHU0RUM1XHU2NTg3XHU3QUUwXHU5ODc1XHUyNDYwXHVGRjFCICdjdXN0b20nID0+IFx1NEVDNVx1ODFFQVx1NUI5QVx1NEU0OVx1OTg3NVx1MjQ2MFxyXG4gKlxyXG4gKiAgIHdpbmRvd0xCOiBodG1sU3RyaW5nLCBcdTUxNjhcdTVDNDBcdTdBOTdcdTUzRTNcdTVERTZcdTRFMEJcdTg5RDJcdTI0NjFcclxuICogICB3aW5kb3dSQjogaHRtbFN0cmluZywgXHU1MTY4XHU1QzQwXHU3QTk3XHU1M0UzXHU1M0YzXHU0RTBCXHU4OUQyXHUyNDYxXHJcbiAqIH1cclxuICpcclxuICogXHUyNDYwXHU2Q0U4XHVGRjFBXHU1NzI4Lm1kXHU2NTg3XHU0RUY2ZnJvbnQgbWF0dGVyXHU5MTREXHU3RjZFYGFydGljbGU6IGZhbHNlYFx1NzY4NFx1OTg3NVx1OTc2Mlx1NjYyRlx1ODFFQVx1NUI5QVx1NEU0OVx1OTg3NVx1RkYwQ1x1NjcyQVx1OTE0RFx1N0Y2RVx1NzY4NFx1OUVEOFx1OEJBNFx1NjYyRlx1NjU4N1x1N0FFMFx1OTg3NVx1RkYwOFx1OTk5Nlx1OTg3NVx1OTY2NFx1NTkxNlx1RkYwOVx1MzAwMlxyXG4gKiBcdTI0NjFcdTZDRThcdUZGMUF3aW5kb3dMQiBcdTU0OEMgd2luZG93UkJcdUZGMUExLlx1NUM1NVx1NzkzQVx1NTMzQVx1NTc1N1x1NjcwMFx1NTkyN1x1NUJCRFx1OUFEODIwMHB4KjQwMHB4XHUzMDAyMi5cdThCRjdcdTdFRDlcdTgxRUFcdTVCOUFcdTRFNDlcdTUxNDNcdTdEMjBcdTVCOUFcdTRFMDBcdTRFMkFcdTRFMERcdThEODVcdThGQzcyMDBweCo0MDBweFx1NzY4NFx1NUJCRFx1OUFEOFx1MzAwMjMuXHU1NzI4XHU1QzRGXHU1RTU1XHU1QkJEXHU1RUE2XHU1QzBGXHU0RThFOTYwcHhcdTY1RjZcdTY1RTBcdThCQkFcdTU5ODJcdTRGNTVcdTkwRkRcdTRFMERcdTRGMUFcdTY2M0VcdTc5M0FcdTMwMDJcclxuICovXHJcbmNvbnN0IGh0bWxNb2R1bGU6IFZkb2luZ1RoZW1lQ29uZmlnWydodG1sTW9kdWxlcyddID0ge1xyXG4gIC8qaG9tZVNpZGViYXJCOlxyXG4gICAgYDxkaXYgc3R5bGU9XCJwYWRkaW5nOiAwLjk1cmVtXCI+XHJcbiAgICA8cCBzdHlsZT1cIlxyXG4gICAgICBjb2xvcjogdmFyKC0tdGV4dENvbG9yKTtcclxuICAgICAgb3BhY2l0eTogMC45O1xyXG4gICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICBtYXJnaW46IDAgMCA4cHggMDtcclxuICAgIFwiPlx1NTE2Q1x1NEYxN1x1NTNGNzwvcD5cclxuICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9vcGVuLndlaXhpbi5xcS5jb20vcXIvY29kZT91c2VybmFtZT1naF8wY2Y0YjgxMzkxOGNcIiAgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiIC8+XHJcbiAgICBcdTUxNzNcdTZDRThcdTUxNkNcdTRGMTdcdTUzRjdcdUZGMENcdTU2REVcdTU5MERbPGI+XHU1MjREXHU3QUVGXHU4RDQ0XHU2RTkwPC9iPl1cdUZGMENcdTUzRUZcdTgzQjdcdTUzRDYgPGEgaHJlZj1cImh0dHBzOi8vZ2FtZS54dWdhb3lpLmNvbVwiIGFyZ2V0PVwiX2JsYW5rXCIgPlx1NTI0RFx1N0FFRlx1NUI2Nlx1NEU2MFx1OEQ0NFx1NkU5MDxzcGFuPjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiBjbGFzcz1cImljb24gb3V0Ym91bmRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xOC44LDg1LjFoNTZsMCwwYzIuMiwwLDQtMS44LDQtNHYtMzJoLTh2MjhoLTQ4di00OGgyOHYtOGgtMzJsMCwwYy0yLjIsMC00LDEuOC00LDR2NTZDMTQuOCw4My4zLDE2LjYsODUuMSwxOC44LDg1LjF6XCI+PC9wYXRoPiA8cG9seWdvbiBmaWxsPVwiY3VycmVudENvbG9yXCIgcG9pbnRzPVwiNDUuNyw0OC43IDUxLjMsNTQuMyA3Ny4yLDI4LjUgNzcuMiwzNy4yIDg1LjIsMzcuMiA4NS4yLDE0LjkgNjIuOCwxNC45IDYyLjgsMjIuOSA3MS41LDIyLjlcIj48L3BvbHlnb24+PC9zdmc+IDxzcGFuIGNsYXNzPVwic3Itb25seVwiPihvcGVucyBuZXcgd2luZG93KTwvc3Bhbj48L3NwYW4+PC9hPlxyXG4gICAgPC9wPlxyXG4gICAgPC9kaXY+YCwqL1xyXG4gIC8vIGA8IS0tIFx1N0VCNVx1NTQxMVx1ODFFQVx1OTAwMlx1NUU5NCAtLT5cclxuICAvLyA8aW5zIGNsYXNzPVwiYWRzYnlnb29nbGVcIlxyXG4gIC8vICAgICBzdHlsZT1cImRpc3BsYXk6YmxvY2s7cGFkZGluZzogMC45NXJlbTtcIlxyXG4gIC8vICAgICBkYXRhLWFkLWNsaWVudD1cImNhLXB1Yi03ODI4MzMzNzI1OTkzNTU0XCJcclxuICAvLyAgICAgZGF0YS1hZC1zbG90PVwiNzgwMjY1NDU4MlwiXHJcbiAgLy8gICAgIGRhdGEtYWQtZm9ybWF0PVwiYXV0b1wiXHJcbiAgLy8gICAgIGRhdGEtZnVsbC13aWR0aC1yZXNwb25zaXZlPVwidHJ1ZVwiPjwvaW5zPlxyXG4gIC8vIDxzY3JpcHQ+XHJcbiAgLy8gICAgIChhZHNieWdvb2dsZSA9IHdpbmRvdy5hZHNieWdvb2dsZSB8fCBbXSkucHVzaCh7fSk7XHJcbiAgLy8gPC9zY3JpcHQ+YCxcclxuICAvLyBzaWRlYmFyVDpcclxuICAvLyAgIGA8IS0tICBcdTU2RkFcdTVCOUExMDAlICogMTUwcHhcdTUzRUZcdTY2M0VcdTc5M0FcdUZGMENtYXgtaGVpZ2h0OjE1MHB4IFx1NjcyQVx1ODlDMVx1NjYzRVx1NzkzQS0tPlxyXG4gIC8vICAgPGlucyBjbGFzcz1cImFkc2J5Z29vZ2xlXCJcclxuICAvLyAgICAgICAgIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJTttYXgtaGVpZ2h0OjE1MHB4XCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtY2xpZW50PVwiY2EtcHViLTc4MjgzMzM3MjU5OTM1NTRcIlxyXG4gIC8vICAgICAgICAgZGF0YS1hZC1zbG90PVwiNjYyNTMwNDI4NFwiPjwvaW5zPlxyXG4gIC8vICAgICA8c2NyaXB0PlxyXG4gIC8vICAgICAgICAgKGFkc2J5Z29vZ2xlID0gd2luZG93LmFkc2J5Z29vZ2xlIHx8IFtdKS5wdXNoKHt9KTtcclxuICAvLyAgICAgPC9zY3JpcHQ+YCxcclxuICAvLyBzaWRlYmFyQjpcclxuICAvLyAgIGA8IS0tIFx1NkI2M1x1NjVCOVx1NUY2MiAtLT5cclxuICAvLyAgICAgPGlucyBjbGFzcz1cImFkc2J5Z29vZ2xlXCJcclxuICAvLyAgICAgICAgIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiXHJcbiAgLy8gICAgICAgICBkYXRhLWFkLWNsaWVudD1cImNhLXB1Yi03ODI4MzMzNzI1OTkzNTU0XCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtc2xvdD1cIjM1MDg3NzMwODJcIlxyXG4gIC8vICAgICAgICAgZGF0YS1hZC1mb3JtYXQ9XCJhdXRvXCJcclxuICAvLyAgICAgICAgIGRhdGEtZnVsbC13aWR0aC1yZXNwb25zaXZlPVwidHJ1ZVwiPjwvaW5zPlxyXG4gIC8vICAgICA8c2NyaXB0PlxyXG4gIC8vICAgICAgICAgKGFkc2J5Z29vZ2xlID0gd2luZG93LmFkc2J5Z29vZ2xlIHx8IFtdKS5wdXNoKHt9KTtcclxuICAvLyAgICAgPC9zY3JpcHQ+YCxcclxuICAvLyBwYWdlVDpcclxuICAvLyAgIGA8IS0tIFx1NTZGQVx1NUI5QTEwMCUgKiA5MHB4XHU1M0VGXHU2NjNFXHU3OTNBXHVGRjBDbWF4LWhlaWdodDo5MHB4XHU2NzJBXHU4OUMxXHU2NjNFXHU3OTNBLS0+XHJcbiAgLy8gICAgPGlucyBjbGFzcz1cImFkc2J5Z29vZ2xlXCJcclxuICAvLyAgICAgICAgIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJTttYXgtaGVpZ2h0OjkwcHhcIlxyXG4gIC8vICAgICAgICAgZGF0YS1hZC1jbGllbnQ9XCJjYS1wdWItNzgyODMzMzcyNTk5MzU1NFwiXHJcbiAgLy8gICAgICAgICBkYXRhLWFkLXNsb3Q9XCI2NjI1MzA0Mjg0XCI+PC9pbnM+XHJcbiAgLy8gICAgIDxzY3JpcHQ+XHJcbiAgLy8gICAgICAgICAoYWRzYnlnb29nbGUgPSB3aW5kb3cuYWRzYnlnb29nbGUgfHwgW10pLnB1c2goe30pO1xyXG4gIC8vICAgICA8L3NjcmlwdD5gLFxyXG4gIC8vIHBhZ2VUc2hvd01vZGU6ICdhcnRpY2xlJyxcclxuICAvLyBwYWdlQjpcclxuICAvLyAgIGA8IS0tIFx1NkEyQVx1NTQxMVx1ODFFQVx1OTAwMlx1NUU5NCAtLT5cclxuICAvLyAgICAgPGlucyBjbGFzcz1cImFkc2J5Z29vZ2xlXCJcclxuICAvLyAgICAgICAgIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiXHJcbiAgLy8gICAgICAgICBkYXRhLWFkLWNsaWVudD1cImNhLXB1Yi03ODI4MzMzNzI1OTkzNTU0XCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtc2xvdD1cIjY2MjAyNDU0ODlcIlxyXG4gIC8vICAgICAgICAgZGF0YS1hZC1mb3JtYXQ9XCJhdXRvXCJcclxuICAvLyAgICAgICAgIGRhdGEtZnVsbC13aWR0aC1yZXNwb25zaXZlPVwidHJ1ZVwiPjwvaW5zPlxyXG4gIC8vICAgICA8c2NyaXB0PlxyXG4gIC8vICAgICAgICAgKGFkc2J5Z29vZ2xlID0gd2luZG93LmFkc2J5Z29vZ2xlIHx8IFtdKS5wdXNoKHt9KTtcclxuICAvLyAgICAgPC9zY3JpcHQ+YCxcclxuICAvLyBwYWdlQnNob3dNb2RlOiAnYXJ0aWNsZScsXHJcbiAgLy8gd2luZG93TEI6IC8vIFx1NEYxQVx1OTA2RVx1NjMyMVx1OTBFOFx1NTIwNlx1NEZBN1x1OEZCOVx1NjgwRlxyXG4gIC8vICAgYDwhLS0gXHU1NkZBXHU1QjlBMjAwKjIwMHB4IC0tPlxyXG4gIC8vICAgICA8c2NyaXB0IGFzeW5jIHNyYz1cImh0dHBzOi8vcGFnZWFkMi5nb29nbGVzeW5kaWNhdGlvbi5jb20vcGFnZWFkL2pzL2Fkc2J5Z29vZ2xlLmpzXCI+PC9zY3JpcHQ+XHJcbiAgLy8gICAgIDxpbnMgY2xhc3M9XCJhZHNieWdvb2dsZVwiXHJcbiAgLy8gICAgICAgICBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjIwMHB4O2hlaWdodDoyMDBweFwiXHJcbiAgLy8gICAgICAgICBkYXRhLWFkLWNsaWVudD1cImNhLXB1Yi03ODI4MzMzNzI1OTkzNTU0XCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtc2xvdD1cIjY2MjUzMDQyODRcIj48L2lucz5cclxuICAvLyAgICAgPHNjcmlwdD5cclxuICAvLyAgICAgICAgIChhZHNieWdvb2dsZSA9IHdpbmRvdy5hZHNieWdvb2dsZSB8fCBbXSkucHVzaCh7fSk7XHJcbiAgLy8gICAgIDwvc2NyaXB0PmAsXHJcbiAgLy8gd2luZG93UkI6XHJcbiAgLy8gICBgPCEtLSBcdTU2RkFcdTVCOUExNjAqMTYwcHggLS0+XHJcbiAgLy8gICAgIDxpbnMgY2xhc3M9XCJhZHNieWdvb2dsZVwiXHJcbiAgLy8gICAgICAgICBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO21heC13aWR0aDoxNjBweDttYXgtaGVpZ2h0OjE2MHB4XCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtY2xpZW50PVwiY2EtcHViLTc4MjgzMzM3MjU5OTM1NTRcIlxyXG4gIC8vICAgICAgICAgZGF0YS1hZC1zbG90PVwiODM3NzM2OTY1OFwiPjwvaW5zPlxyXG4gIC8vICAgICA8c2NyaXB0PlxyXG4gIC8vICAgICAgICAgKGFkc2J5Z29vZ2xlID0gd2luZG93LmFkc2J5Z29vZ2xlIHx8IFtdKS5wdXNoKHt9KTtcclxuICAvLyAgICAgPC9zY3JpcHQ+XHJcbiAgLy8gICAgIGAsXHJcbn1cclxuXHJcblxyXG4vLyBjb25zdCBodG1sTW9kdWxlID0ge1xyXG4vLyAgIGhvbWVTaWRlYmFyQjogYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6ICNlZWU7XCI+XHU4MUVBXHU1QjlBXHU0RTQ5XHU2QTIxXHU1NzU3XHU2RDRCXHU4QkQ1PC9kaXY+YCxcclxuLy8gICBzaWRlYmFyVDogYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6ICNlZWU7XCI+XHU4MUVBXHU1QjlBXHU0RTQ5XHU2QTIxXHU1NzU3XHU2RDRCXHU4QkQ1PC9kaXY+YCxcclxuLy8gICBzaWRlYmFyQjogYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6ICNlZWU7XCI+XHU4MUVBXHU1QjlBXHU0RTQ5XHU2QTIxXHU1NzU3XHU2RDRCXHU4QkQ1PC9kaXY+YCxcclxuLy8gICBwYWdlVDogYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6ICNlZWU7XCI+XHU4MUVBXHU1QjlBXHU0RTQ5XHU2QTIxXHU1NzU3XHU2RDRCXHU4QkQ1PC9kaXY+YCxcclxuLy8gICBwYWdlQjogYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6ICNlZWU7XCI+XHU4MUVBXHU1QjlBXHU0RTQ5XHU2QTIxXHU1NzU3XHU2RDRCXHU4QkQ1PC9kaXY+YCxcclxuLy8gICB3aW5kb3dMQjogYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6ICNlZWU7XCI+XHU4MUVBXHU1QjlBXHU0RTQ5XHU2QTIxXHU1NzU3XHU2RDRCXHU4QkQ1PC9kaXY+YCxcclxuLy8gICB3aW5kb3dSQjogYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDBweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6ICNlZWU7XCI+XHU4MUVBXHU1QjlBXHU0RTQ5XHU2QTIxXHU1NzU3XHU2RDRCXHU4QkQ1PC9kaXY+YCxcclxuLy8g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
