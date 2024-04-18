import React from 'react'
import SideBar from '../sideBar/page'
import Image from 'next/image'
import logo from '/public/moneylogo.png'
import money from '/public/whatmoney.jpg';
import Passbook from '/public/Passbook.png';
import superrich from '/public/superrich.png';
import realEstate from '/public/realEstate.png';
import saving01 from '/public/saving01.png';
import saving02 from '/public/saving02.png';
import growth from '/public/growth.jpg';

import coin from '/public/coin.png';
import Link from 'next/link';




export default function HomePage() {
  return (
        <>

        <header className='flex justify-between px-40 py-4 bg-sky-50'>
                <div className='flex items-center gap-4'>
                <Link className="p-3" href={`/components/home`}>
                    ALIVE-MONEY
                </Link>
                </div>
                <SideBar/>
        </header> 
    
        <main>
            <section className='py-4 mt-4 text-center bg-gray-300 '>돈좀 모으고 싶다하는 사람들만 주목하세요!!</section>

            {/* <section className='mb-4'>건강한 경제력을 키우는 돈 관리 프로젝트</section> */}

            <section className="relative flex flex-col items-center justify-center min-h-screen mt-4 bg-gray-100 bg-cover bg-whatMoney">
                <div className="absolute inset-0 bg-black opacity-50 blur"></div>
                <div className="z-10 flex flex-col items-center justify-center text-center text-white">
                    <h2 className="mb-8 text-3xl font-bold notoSansKr">우리에게 돈이란?</h2>
                    <p className="max-w-lg text-lg leading-8">
                        돈은 교환 매체로 사용되는 통화나 가치를 나타내는 일반적인 용어입니다. 다양한 형태의 돈이 존재하지만, 주로 통용되는 것은 국가에서 발행한 화폐입니다. 돈은 주로 다음과 같은 기능을 수행합니다:
                        교환 매체 - 돈은 상품이나 서비스와 교환할 때 사용되는 매체로 기능합니다. 사람들은 돈을 사용하여 물건을 사거나 서비스를 받습니다.
                    </p>
                    <a href="https://www.youtube.com/watch?v=2rO8_2gJKjc&t=1329s" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center mt-8">
                        <img src="https://img.youtube.com/vi/2rO8_2gJKjc/maxresdefault.jpg" alt="YouTube 썸네일" className="w-24 h-16 rounded" />
                        <span className="ml-2 text-red-600 ">돈의 원리를 알려줄게!!</span>
                    </a>
                </div>
            </section>
            
           
            <section className="relative flex flex-col items-center justify-center min-h-screen mt-4 bg-gray-100 bg-center bg-no-repeat bg-contain bg-savingpigmoney">
                <div className="absolute inset-0 bg-black opacity-50 blur"></div>
                <div className="z-10 flex flex-col items-center justify-center text-center text-white">
                <h2 className="mb-8 text-3xl font-bold notoSansKr">저축은 필수입니다.</h2>
                <p className="max-w-lg text-lg leading-8">
                    저축이란 돈을 모으는 행위를 말합니다.<br />
                    저축의 목적은 각자 다를 수 있지만, 부자가 되기 위한 가장 처음이 되는 단계입니다.
                    저축은 한번 하는 것이 아니라, 매달 매년 일정 금액을 하는 것이 중요하며, 계획을 세워서 꾸준하게 하는 자가 곧!! 승리하는 싸움입니다.
                    너무 적다고 생각하지말고, 저축은 미래를 위한 투자이며, 투자를 하기 위한 시드입니다.
                    <br/>
                    우리 모두 다 같이 저축을 즐거워하는 사람이 됩시다.
                </p>
                <a href="https://www.youtube.com/watch?v=c4CX3bQ0poU" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center mt-8">
                    <img src="https://img.youtube.com/vi/c4CX3bQ0poU/maxresdefault.jpg" alt="YouTube 썸네일" className="w-24 h-16 rounded" />
                    <span className="ml-2 text-red-600">저축이 부자가는 길에 기본입니다.</span>
                </a>
            </div>
            </section>

            
            <section className="relative flex flex-col items-center justify-center min-h-screen mt-4 bg-gray-100 bg-center bg-no-repeat bg-contain bg-growth">
                <div className="absolute inset-0 bg-black opacity-50 blur"></div>
                <div className="z-10 flex flex-col items-center justify-center text-center text-white">
                <h2 className="mb-8 text-3xl font-bold notoSansKr">우리는 통장에 1억을 모을 수 있을까?</h2>
                <p className="max-w-lg text-lg leading-8">
                    많은 사람들이 투자,펀드를 하기 전에 1억부터 모으라는 말을 많이 합니다.
                    아마 이뜻은 본인의 절제력과 나는 과연 부자가 될 사람인가?? 하는 가장 처음이 되는 테스트라고 느낍니다.
                </p>
                <a href="https://www.youtube.com/watch?v=pp-Z44eXA-A" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center mt-8">
                    <img src="https://img.youtube.com/vi/pp-Z44eXA-A/maxresdefault.jpg" alt="YouTube 썸네일" className="w-24 h-16 rounded" />
                    <span className="ml-2 text-red-600">일단 1억부터 모으라고 합니다.</span>
                </a>
            </div>
            </section>

             <section className="relative flex flex-col items-center justify-center min-h-screen mt-4 bg-gray-100 bg-center bg-no-repeat bg-contain bg-coin">
                <div className="absolute inset-0 bg-black opacity-50 blur"></div>
                <div className="z-10 flex flex-col items-center justify-center text-center text-white">
                <h2 className="mb-8 text-3xl font-bold notoSansKr">투자를 꼭 하셔야 합니다.</h2>
                <p className="max-w-lg text-lg leading-8">
                    요즘 시대 많은 사람들이 투자를 합니다.
                    코인, 주식, 부동산, 채권 등등 다양하게 하지만, 무엇보다 본인한테 맞는 걸 찾고, 많은 공부와 테스트를 통해
                    본인이 꾸준히 할 수 있는 방법을 선택하시면 됩니다.
                    부자가 되기 위해선 월급만으로 인플레이션을 따라 갈 수 있기 때문에 필수입니다.
                </p>
                <a href="https://www.youtube.com/watch?v=C1HOggMJSS0" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center mt-8">
                    <img src="https://img.youtube.com/vi/C1HOggMJSS0/maxresdefault.jpg" alt="YouTube 썸네일" className="w-24 h-16 rounded" />
                    <span className="ml-2 text-red-600">투자 공부 많이 해야합니다.</span>
                </a>
            </div>
            </section>


        </main>
        </>
  )
}
