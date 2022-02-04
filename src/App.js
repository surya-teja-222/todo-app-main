import { useEffect, useLayoutEffect, useState } from 'react';

import darkPC from './assets/bg-desktop-dark.jpg'
import lightPC from './assets/bg-desktop-light.jpg'
import darkM from './assets/bg-mobile-dark.jpg'
import lightM from './assets/bg-mobile-light.jpg'

function App() {

    const [dark, setDark] = useState(true);
    const [todos, setTodos] = useState([]);
    const [method , setMethod] = useState('all');


    useEffect(
        () => {
            if(localStorage.getItem('method'))
            {
                setMethod(localStorage.getItem('method'));
            }
            else{
                localStorage.setItem('method', 'all');
                setMethod('all');
            }
        }
    )
    // 1st use effect for validating theme.
    useEffect(
        () => {
            if (!localStorage.getItem('theme') | (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
                setDark(true);
            } else {
                document.documentElement.classList.remove('dark')
                setDark(false);
            }
            document.getElementById('pcbg').src = dark ? darkPC : lightPC;
            document.getElementById('mob-bg').src = dark ? darkM : lightM;

        }, [dark]
    )
    // use effect to initially change, todo items,
    useEffect(
        () => {
            if (localStorage.getItem('todos')) {
                setTodos(JSON.parse(localStorage.getItem('todos')));
            } else {
                var x =
                    `
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
                localStorage.setItem('todos', x);
            };
            
        }, []
    );

    

    useEffect(() => {
        document.getElementById('input').addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                if (e.target.value !== '' || e.target.value != null) {
                    if (localStorage.getItem('todos')) {
                        var tod = JSON.parse(localStorage.getItem('todos'));
                    }
                    else {
                        var tod = []
                    }
                    var k = tod.Unfinished.length;
                    var ne = `
                    {
                        "Index": ${k},
                        "Todo" : "${e.target.value}"
                    }`;
                    tod.Unfinished.push(JSON.parse(ne));
                    localStorage.setItem('todos', JSON.stringify(tod));
                    setTodos(tod);
                    e.target.value = '';
                } else {
                    document.getElementById('input').placeholder = 'Please enter a todo';
                    setTimeout(() => {
                        document.getElementById('input').placeholder = 'Create a new todo...';
                    }, 3000);
                }
            }
        })
    }, [])

    useEffect(() => {
        if(method)
        {
            document.getElementById(method).style.color = 'hsl(220,98%,61%)';
        }
    } , [method] )

    useEffect(() => {
        var x = JSON.parse(localStorage.getItem('todos'));
        if(x){
            document.getElementById('items-left').innerHTML = x.Unfinished.length + ' items left';
        }
        if(method)
        {
            document.getElementById(method).style.color = 'hsl(220,98%,61%)';
        }
    }, [todos])



    const block = (key, event, index) => {

        var cl = 'group w-full flex gap-[1rem] px-4 min-h-16 h-16 bg-[#ffffff] dark:bg-[#25273c]  transition-all duration-500 ease-in-out';

        return (
            <>
                <div id={key+'u'} key={key} className={cl}>
                    <div
                        onClick={() => {
                            var tod = JSON.parse(localStorage.getItem('todos'));
                            var k = tod.Unfinished[index];
                            tod.Finished.push(k);
                            tod.Unfinished.splice(index, 1);
                            setTodos(tod);
                            localStorage.setItem('todos', JSON.stringify(tod));
                        }}
                        className=
                        ' cursor-pointer linear-gradient-exc linear-gradient my-auto w-[24px] h-[20px]  hmhmm'
                    ></div>
                    <div className='my-auto w-full h-6'>
                        <p className='cursor-pointer  outline-none  h-6 font-normal bg-inherit dark:text-[hsl(234,39%,85%)] dark:hover:text-[hsl(236,33%,92%)] text-[hsl(235,19%,35%)] w-full transition-all duration-500 ease-in-out'>
                            {event}
                        </p>
                    </div>
                    <div className='ml-auto my-auto flex flex-col gap-2 group  group-hover:opacity-100 opacity-0 transition-all duration-300 ease-linear cursor-pointer'
                        onClick={
                            () => {
                                var tod = JSON.parse(localStorage.getItem('todos'));
                                tod.Unfinished.splice(index, 1);
                                setTodos(tod);
                                localStorage.setItem('todos', JSON.stringify(tod));
                            }
                        }
                    >
                        <div className='h-[1px] w-[24px] dark:bg-white  bg-[#4e5065]  rotate-45  translate-y-1 transition-all duration-300 ease-linear'></div>
                        <div className='h-[1px] w-[24px] dark:bg-white  bg-[#4e5065]  -rotate-45 -translate-y-1 transition-all duration-300 ease-linear'></div>
                    </div>
                </div>
                <div key={key + "."} className='w-full h-[1px] dark:bg-[#515474] bg-[#e5e4e9] '></div>
            </>
        );
    }

    const unfinishedBlock = (key, event, index) => {
        if (key === 1) {
            var cl = 'group w-full flex gap-[1rem] px-4 h-16 bg-[#ffffff] dark:bg-[#25273c] rounded-t-[5px] transition-all duration-500 ease-in-out';
        }
        else {
            var cl = 'group w-full flex gap-[1rem] px-4 h-16 bg-[#ffffff] dark:bg-[#25273c]  transition-all duration-500 ease-in-out';
        }
        return (
            <>
                <div id={key+'f'} key={key} className={cl}>
                    <div
                        onClick={
                            () => {
                                var tod = JSON.parse(localStorage.getItem('todos'));
                                var k = tod.Finished[index];
                                tod.Unfinished.push(k);
                                tod.Finished.splice(index, 1);
                                setTodos(tod);
                                localStorage.setItem('todos', JSON.stringify(tod));
                            }
                        }

                        className=
                        ' linear-gradient-nh my-auto w-[24px] h-[20px]  '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" className='self-center align-middle m-auto h-full'>
                            <path className='translate-y-[25%]' fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
                        </svg>
                    </div>
                    <div className='my-auto w-full h-6'>
                        <p className='cursor-pointer outline-none  line-through h-6 font-normal bg-inherit dark:text-[#4e5065]  text-[#9f9f9f] w-full transition-all duration-500 ease-in-out'>
                            {event}
                        </p>
                    </div>
                    <div className='ml-auto my-auto flex flex-col gap-2 group  group-hover:opacity-100 opacity-0 transition-all duration-300 ease-linear cursor-pointer'
                        onClick={
                            () => {
                                var tod = JSON.parse(localStorage.getItem('todos'));
                                tod.Finished.splice(index, 1);
                                setTodos(tod);
                                localStorage.setItem('todos', JSON.stringify(tod));
                            }
                        }
                    >
                        <div className='h-[1px] w-[24px] dark:bg-white bg-[#4e5065]  rotate-45  translate-y-1 transition-all duration-300 ease-linear'></div>
                        <div className='h-[1px] w-[24px] dark:bg-white  bg-[#4e5065] -rotate-45 -translate-y-1 transition-all duration-300 ease-linear'></div>
                    </div>
                </div>
                <div key={key + "."} className='w-full h-[1px] dark:bg-[#515474] bg-[#e5e4e9] '></div>
            </>
        );
    }


    const lastEmelent = (method) => {
        return (
            <div className='group w-full flex justify-between gap-[1rem] px-6 h-10 bg-[#ffffff] dark:bg-[#25273c] rounded-[5px]  transition-all duration-500 ease-in-out'>
                <div className='my-auto justify-center self-center align-middle h-full'>
                    <div  id="items-left" className='text-[#494c6d] text-sm h-full flex flex-col justify-center ' >items left</div>
                </div>
                <div className='my-auto justify-center flex self-center align-middle h-full  text-sm gap-2'>
                    <div id='all' className='text-[#494c6d] hover:text-black hover:dark:text-[#ffffff] transition-all ease-in-out duration-300 cursor-pointer  h-full flex flex-col justify-center ' 
                        onClick={() => {
                            setMethod('all');
                            localStorage.setItem('method', 'all');
                        }}
                    >All</div>
                    <div id='active' className='text-[#494c6d] hover:text-black hover:dark:text-[#ffffff] transition-all ease-in-out duration-300 cursor-pointer h-full flex flex-col justify-center ' onClick={() => {
                            setMethod('active');
                            localStorage.setItem('method', 'active');
                        }}>Active</div>
                    <div id='completed' className='text-[#494c6d] hover:text-black hover:dark:text-[#ffffff] transition-all ease-in-out duration-300 cursor-pointer h-full flex flex-col justify-center ' onClick={() => {
                            setMethod('completed');
                            localStorage.setItem('method', 'completed');
                        }}>Completed</div>
                </div>
                <div className='my-auto justify-center self-center align-middle h-full text-sm'>
                    <div className='text-[#494c6d] hover:text-black hover:dark:text-[#ffffff] transition-all ease-in-out duration-300 h-full flex flex-col justify-center cursor-pointer' 
                        onClick={
                            () => {
                                var k = localStorage.getItem('todos');
                                var tod = JSON.parse(k);
                                tod.Finished = [];
                                setTodos(tod);
                                localStorage.setItem('todos', JSON.stringify(tod));
                            }
                        } 
                    >Clear Completed</div>
                </div>
            </div>
        );
    }


    function setListItems(todos , method) {
        if (todos) {

            var json_todo = todos;
            var unfinished = json_todo.Unfinished;
            var finished = json_todo.Finished;

            var export_arr = [];
            if (finished && (method === 'all' || method === 'completed')) {
                var finished_array = [];
                for (var i = 0; i < finished.length; i++) {
                    finished_array.push(finished[i]);
                }
                for (let i = 0; i < finished_array.length; i++) {
                    export_arr.push(unfinishedBlock(finished_array[i].Index, finished_array[i].Todo, i));
                }
            }
            
            if (unfinished && (method === 'all' || method === 'active')) {
                var unfinished_array = [];
                for (var i = 0; i < unfinished.length; i++) {
                    unfinished_array.push(unfinished[i]);
                }
                for (let i = 0; i < unfinished_array.length; i++) {
                    export_arr.push(block(unfinished_array[i].Index, unfinished_array[i].Todo, i));
                }
            }

            export_arr.push(lastEmelent())
            return export_arr;

        }
        else {
            return (<></>)
        }
    }




    return (
        <div className="App ">
            <header className="App-header">
                <div className='w-full h-full absolute -z-10 dark:bg-[#181824] bg-[#fafafa] transition-all duration-500 ease-in-out'>
                    <div className='h-2/5  w-full absolute'>
                        <img id="pcbg" alt='bg  desktop' className='darkk smm:opacity-0  absolute transition-all ease-out duration-500 w-full h-full ' src={darkPC} />
                        <img id="mob-bg" alt="bg  mobile" className='darkk sm:opacity-0 absolute transition-all ease-out duration-500  h-full w-full' src={darkM} />
                    </div>
                </div>
            </header>

            <main className='z-50 w-full h-full  fixed  overflow-y-auto'>
                <div className='w-full h-full grid md:grid-cols-main-c   mdm:grid-cols-main-cm justify-center self-center'>
                    <div></div>
                    <div className='w-full h-full  font-josefin text-[18px]'>
                        <div className='flex justify-between mt-20'>
                            <h1 aria-level={1} className='font-bold text-[48px] leading-10 text-white tracking-[.5rem]'>
                                TODO
                            </h1>
                            <div className='w-[26px] h-[26px]' onClick={
                                () => {
                                    if (dark) {
                                        localStorage.setItem('theme', !dark);
                                        setDark(!dark);
                                        document.getElementById('p-sun').classList.remove('opacity-100');
                                        document.getElementById('p-sun').classList.add('opacity-0');
                                        document.getElementById('p-moon').classList.remove('opacity-0');
                                        document.getElementById('p-moon').classList.add('opacity-100');
                                    }
                                    else {
                                        localStorage.removeItem('theme');
                                        setDark(!dark);
                                        document.getElementById('p-moon').classList.add('opacity-0');
                                        document.getElementById('p-moon').classList.remove('opacity-100');
                                        document.getElementById('p-sun').classList.add('opacity-100');
                                        document.getElementById('p-sun').classList.remove('opacity-0');
                                    }
                                }
                            } >
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" >
                                    <path id="p-sun" className='opacity-100 transition-all ease-in-out duration-500' fill="#FFF" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" />
                                    <path id="p-moon" className='opacity-0 transition-all ease-in-out duration-500' fill="#FFF" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" />
                                </svg>
                            </div>
                        </div>

                        <div id="currently-typing" className='mt-8 w-full flex gap-[1rem] px-4 h-16 bg-[#ffffff] dark:bg-[#25273c] rounded-[5px] transition-all duration-500 ease-in-out'>
                            <div className='my-auto w-[20px] h-[18px] border-[#eeeef0] dark:border-[#494c6d] border-2 rounded-full'>
                            </div>
                            <div className='my-auto w-full h-6'>
                                <input id="input" className='outline-none h-6  bg-inherit dark:text-[hsl(0,0%,98%)] text-[hsl(235,19%,35%)] w-full transition-all duration-500 ease-in-out' placeholder='Create a new todo...' />
                            </div>
                            <div className='ml-auto my-auto '>

                            </div>

                        </div>

                        <div className='w-full h-[30px]'></div>
                        <div id="hmm" >
                            {setListItems(todos , method)}
                        </div>
                        <div className='h-[50px]'></div>
                        <p className='text-sm justify-center text-center text-[#494c6d]'>Drag and drop to reorder list</p>
                    </div>
                    <div></div>
                </div>
            </main>


        </div>
    );
}




export default App;
