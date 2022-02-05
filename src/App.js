import { useEffect, useLayoutEffect, useState } from "react";

import darkPC from "./assets/bg-desktop-dark.jpg";
import lightPC from "./assets/bg-desktop-light.jpg";
import darkM from "./assets/bg-mobile-dark.jpg";
import lightM from "./assets/bg-mobile-light.jpg";

function App() {
  const [dark, setDark] = useState(true);
  const [todos, setTodos] = useState([]);
  const [method, setMethod] = useState("all");

  useEffect(() => {
    if (localStorage.getItem("method")) {
      setMethod(localStorage.getItem("method"));
    } else {
      localStorage.setItem("method", "all");
      setMethod("all");
    }
  });
  // 1st use effect for validating theme.
  useEffect(() => {
    if (
      !localStorage.getItem("theme") |
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
    document.getElementById("pcbg").src = dark ? darkPC : lightPC;
    document.getElementById("mob-bg").src = dark ? darkM : lightM;
  }, [dark]);
  // use effect to initially change, todo items,
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    } else {
      var x = `
                {
                    "Finished" : [
                        {
                            "Index": 1,
                            "Todo" : "Complete online JavaScript course"
                        }
                    ],
                    "Unfinished" : [
                        {
                            "Index": 1,
                            "Todo" : "Jog around the park 3x"
                        },
                        {
                            "Index": 2,
                            "Todo" : "10 minutes meditation"
                        },
                        {
                            "Index": 3,
                            "Todo" : "Read for 1 hour"
                        },
                        {
                            "Index": 4,
                            "Todo" : "Pick up groceries"
                        },
                        {
                            "Index": 5,
                            "Todo" : "Complete Todo App on Frontend Mentor"
                        }
                    ]
                }`;

      setTodos(JSON.parse(x));
      localStorage.setItem("todos", x);
    }
  }, []);

  useEffect(() => {
    var x = JSON.parse(localStorage.getItem("todos"));
    if (x) {
      document.getElementById("items-left").innerHTML =
        x.Unfinished.length + " items left";
    }
    if (method) {
      document.getElementById(method).style.color = "hsl(220,98%,61%)";
    }
  }, [todos , method]);

  useEffect(() => {
    if (method) {
      document.getElementById(method).style.color = "hsl(220,98%,61%)";
    }
    else{
      setMethod("all");
      document.getElementById('all').style.color = "hsl(220,98%,61%)";
    }
  }, [method]);

  useEffect(() => {
    document.getElementById("input").addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        if (document.getElementById("input").value && document.getElementById("input").trim().length > 0) {
          if (localStorage.getItem("todos")) {
            var tod = JSON.parse(localStorage.getItem("todos"));
          } else {
            var tod = [];
          }
          var k = tod.Unfinished.length;
          var ne = `
                    {
                        "Index": ${k},
                        "Todo" : "${e.target.value}"
                    }`;
          tod.Unfinished.push(JSON.parse(ne));
          localStorage.setItem("todos", JSON.stringify(tod));
          setTodos(tod);
          e.target.value = "";
        } else {
          document.getElementById("input").value = "";
          document.getElementById("input").placeholder = "Please enter a todo";
          setTimeout(() => {
            document.getElementById("input").placeholder =
              "Create a new todo...";
          }, 3000);

        }
      }
    });
  }, []);

  const block = (key, event, index) => {
    var cl =
      "group w-full flex gap-[1rem] px-4 min-h-16 h-16 bg-[#ffffff] dark:bg-[#25273c]  transition-all duration-500 ease-in-out";

    return (
      <>
        <div id={key + "u"} key={key} className={cl}>
          <div
            onClick={() => {
              var tod = JSON.parse(localStorage.getItem("todos"));
              var k = tod.Unfinished[index];
              tod.Finished.push(k);
              tod.Unfinished.splice(index, 1);
              setTodos(tod);
              localStorage.setItem("todos", JSON.stringify(tod));
            }}
            className=" linear-gradient-exc linear-gradient hmhmm my-auto  h-[20px] w-[24px]  cursor-pointer"
          ></div>
          <div className="my-auto h-6 w-full">
            <p className="h-6  w-full  cursor-pointer bg-inherit font-normal text-[hsl(235,19%,35%)] outline-none transition-all duration-500 ease-in-out dark:text-[hsl(234,39%,85%)] dark:hover:text-[hsl(236,33%,92%)]">
              {event}
            </p>
          </div>
          <div
            className="group my-auto ml-auto flex cursor-pointer flex-col  gap-2 opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
            onClick={() => {
              var tod = JSON.parse(localStorage.getItem("todos"));
              tod.Unfinished.splice(index, 1);
              setTodos(tod);
              localStorage.setItem("todos", JSON.stringify(tod));
            }}
          >
            <div className="h-[1px] w-[24px] translate-y-1  rotate-45  bg-[#4e5065]  transition-all duration-300 ease-linear dark:bg-white"></div>
            <div className="h-[1px] w-[24px] -translate-y-1  -rotate-45  bg-[#4e5065] transition-all duration-300 ease-linear dark:bg-white"></div>
          </div>
        </div>
        <div
          key={key + "."}
          className="h-[1px] w-full bg-[#e5e4e9] dark:bg-[#515474] "
        ></div>
      </>
    );
  };

  const unfinishedBlock = (key, event, index) => {
    if (key === 1) {
      var cl =
        "group w-full flex gap-[1rem] px-4 h-16 bg-[#ffffff] dark:bg-[#25273c] rounded-t-[5px] transition-all duration-500 ease-in-out";
    } else {
      var cl =
        "group w-full flex gap-[1rem] px-4 h-16 bg-[#ffffff] dark:bg-[#25273c]  transition-all duration-500 ease-in-out";
    }
    return (
      <>
        <div id={key + "f"} key={key} className={cl}>
          <div
            onClick={() => {
              var tod = JSON.parse(localStorage.getItem("todos"));
              var k = tod.Finished[index];
              tod.Unfinished.push(k);
              tod.Finished.splice(index, 1);
              setTodos(tod);
              localStorage.setItem("todos", JSON.stringify(tod));
            }}
            className=" linear-gradient-nh my-auto h-[20px] w-[24px]  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              className="m-auto h-full self-center align-middle"
            >
              <path
                className="translate-y-[25%]"
                fill="none"
                stroke="#FFF"
                strokeWidth="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </div>
          <div className="my-auto h-6 w-full">
            <p className="h-6 w-full  cursor-pointer bg-inherit font-normal text-[#9f9f9f] line-through  outline-none transition-all duration-500 ease-in-out dark:text-[#4e5065]">
              {event}
            </p>
          </div>
          <div
            className="group my-auto ml-auto flex cursor-pointer flex-col  gap-2 opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
            onClick={() => {
              var tod = JSON.parse(localStorage.getItem("todos"));
              tod.Finished.splice(index, 1);
              setTodos(tod);
              localStorage.setItem("todos", JSON.stringify(tod));
            }}
          >
            <div className="h-[1px] w-[24px] translate-y-1 rotate-45  bg-[#4e5065]  transition-all duration-300 ease-linear dark:bg-white"></div>
            <div className="h-[1px] w-[24px] -translate-y-1  -rotate-45 bg-[#4e5065] transition-all duration-300 ease-linear dark:bg-white"></div>
          </div>
        </div>
        <div
          key={key + "."}
          className="h-[1px] w-full bg-[#e5e4e9] dark:bg-[#515474] "
        ></div>
      </>
    );
  };

  const lastEmelent = (method) => {
    return (
      <div className="group flex h-10 w-full justify-between gap-[1rem] rounded-[5px] bg-[#ffffff] px-6 transition-all  duration-500 ease-in-out dark:bg-[#25273c]">
        <div className="my-auto h-full justify-center self-center align-middle">
          <div
            id="items-left"
            className="flex h-full flex-col justify-center text-sm text-[#494c6d] "
          >
            items left
          </div>
        </div>
        <div className="my-auto flex h-full justify-center gap-2 self-center  align-middle text-sm">
          <div
            id="all"
            className="flex h-full cursor-pointer flex-col justify-center text-[#494c6d] transition-all  duration-300 ease-in-out hover:text-black hover:dark:text-[#ffffff] "
            onClick={() => {
              setMethod("all");
              localStorage.setItem("method", "all");
            }}
          >
            All
          </div>
          <div
            id="active"
            className="flex h-full cursor-pointer flex-col justify-center text-[#494c6d] transition-all duration-300 ease-in-out hover:text-black hover:dark:text-[#ffffff] "
            onClick={() => {
              setMethod("active");
              localStorage.setItem("method", "active");
            }}
          >
            Active
          </div>
          <div
            id="completed"
            className="flex h-full cursor-pointer flex-col justify-center text-[#494c6d] transition-all duration-300 ease-in-out hover:text-black hover:dark:text-[#ffffff] "
            onClick={() => {
              setMethod("completed");
              localStorage.setItem("method", "completed");
            }}
          >
            Completed
          </div>
        </div>
        <div className="my-auto h-full justify-center self-center align-middle text-sm">
          <div
            className="flex h-full cursor-pointer flex-col justify-center text-[#494c6d] transition-all duration-300 ease-in-out hover:text-black hover:dark:text-[#ffffff]"
            onClick={() => {
              var k = localStorage.getItem("todos");
              var tod = JSON.parse(k);
              tod.Finished = [];
              setTodos(tod);
              localStorage.setItem("todos", JSON.stringify(tod));
            }}
          >
            Clear Completed
          </div>
        </div>
      </div>
    );
  };

  function setListItems(todos, method) {
    if (todos) {
      var json_todo = todos;
      var unfinished = json_todo.Unfinished;
      var finished = json_todo.Finished;

      var export_arr = [];
      if (finished && (method === "all" || method === "completed")) {
        var finished_array = [];
        for (var i = 0; i < finished.length; i++) {
          finished_array.push(finished[i]);
        }
        for (let i = 0; i < finished_array.length; i++) {
          export_arr.push(
            unfinishedBlock(finished_array[i].Index, finished_array[i].Todo, i)
          );
        }
      }

      if (unfinished && (method === "all" || method === "active")) {
        var unfinished_array = [];
        for (var i = 0; i < unfinished.length; i++) {
          unfinished_array.push(unfinished[i]);
        }
        for (let i = 0; i < unfinished_array.length; i++) {
          export_arr.push(
            block(unfinished_array[i].Index, unfinished_array[i].Todo, i)
          );
        }
      }

      export_arr.push(lastEmelent());
      return export_arr;
    } else {
      return <></>;
    }
  }

  return (
    <div className="App ">
      <header className="App-header">
        <div className="absolute -z-10 h-full w-full bg-[#fafafa] transition-all duration-75 ease-in-out dark:bg-[#181824]">
          <div className="absolute  h-2/5 w-full">
            <img
              id="pcbg"
              alt="bg  desktop"
              className="darkk absolute  h-full w-full transition-all duration-500 ease-out smm:opacity-0 "
              src={darkPC}
            />
            <img
              id="mob-bg"
              alt="bg  mobile"
              className="darkk absolute h-full w-full transition-all duration-500  ease-out sm:opacity-0"
              src={darkM}
            />
          </div>
        </div>
      </header>

      <main className="fixed z-50 h-full  w-full  overflow-y-auto">
        <div className="grid h-full w-full justify-center   self-center md:grid-cols-main-c mdm:grid-cols-main-cm">
          <div></div>
          <div className="h-full w-full  font-josefin text-[18px]">
            <div className="mt-20 flex justify-between">
              <h1
                aria-level={1}
                className="text-[48px] font-bold leading-10 tracking-[.5rem] text-white"
              >
                TODO
              </h1>
              <div
                className="h-[26px] w-[26px]"
                onClick={() => {
                  if (dark) {
                    localStorage.setItem("theme", !dark);
                    setDark(!dark);
                    document
                      .getElementById("p-sun")
                      .classList.remove("opacity-100");
                    document.getElementById("p-sun").classList.add("opacity-0");
                    document
                      .getElementById("p-moon")
                      .classList.remove("opacity-0");
                    document
                      .getElementById("p-moon")
                      .classList.add("opacity-100");
                  } else {
                    localStorage.removeItem("theme");
                    setDark(!dark);
                    document
                      .getElementById("p-moon")
                      .classList.add("opacity-0");
                    document
                      .getElementById("p-moon")
                      .classList.remove("opacity-100");
                    document
                      .getElementById("p-sun")
                      .classList.add("opacity-100");
                    document
                      .getElementById("p-sun")
                      .classList.remove("opacity-0");
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                  <path
                    id="p-sun"
                    className="opacity-100 transition-all duration-500 ease-in-out"
                    fill="#FFF"
                    d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                  />
                  <path
                    id="p-moon"
                    className="opacity-0 transition-all duration-500 ease-in-out"
                    fill="#FFF"
                    d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                  />
                </svg>
              </div>
            </div>

            <div
              id="currently-typing"
              className="mt-8 flex h-16 w-full gap-[1rem] rounded-[5px] bg-[#ffffff] px-4 transition-all duration-500 ease-in-out dark:bg-[#25273c]"
            >
              <div className="my-auto h-[18px] w-[20px] rounded-full border-2 border-[#eeeef0] dark:border-[#494c6d]"></div>
              <div className="my-auto h-6 w-full">
                <input
                  id="input"
                  className="h-6 w-full  bg-inherit text-[hsl(235,19%,35%)] outline-none transition-all duration-500 ease-in-out dark:text-[hsl(0,0%,98%)]"
                  placeholder="Create a new todo..."
                />
              </div>
              <div className="my-auto ml-auto "></div>
            </div>

            <div className="h-[30px] w-full"></div>
            <div id="hmm">{setListItems(todos, method)}</div>
            <div className="h-[50px]"></div>
            <p className="justify-center text-center text-sm text-[#494c6d]">
              Drag and drop to reorder list
            </p>
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}

export default App;
