import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

import { Header, WatchCard, MobileCard, TabletCard } from '../../components';

export default function Home() {
  const API_URL =
    'https://searchapi.samsung.com/v6/front/b2c/product/card/detail/newhybris?siteCode=nl&modelList=SM-F721BZAGEUB,SM-F721BZAHEUB,SM-F721BZAPEUB,SM-F721BZDGEUB,SM-F721BZDHEUB,SM-F721BZDPEUB,SM-F721BLBGEUB,SM-F721BLBHEUB,SM-F721BLBPEUB,SM-F721BLVGEUB,SM-F721BLVHEUB,SM-F721BLVPEUB,SM-F936BZABEUB,SM-F936BZACEUB,SM-F936BZANEUB,SM-F936BZEBEUB,SM-F936BZECEUB,SM-F936BZENEUB,SM-F936BZKBEUB,SM-F936BZKCEUB,SM-F936BZKNEUB,SM-F936BDRBEUB,SM-F936BDRCEUB,SM-S906BIDDEUB,SM-S906BZGDEUB,SM-S906BZKDEUB,SM-S906BZWDEUB,SM-S906BIDGEUB,SM-S906BZGGEUB,SM-S906BZKGEUB,SM-S906BZWGEUB,SM-S906BZADEUB,SM-S906BZEDEUB,SM-S906BZVDEUB,SM-S906BLBDEUB,SM-S906BZAGEUB,SM-S906BZEGEUB,SM-S906BZVGEUB,SM-S906BLBGEUB,SM-R920NZKDWEU,SM-R920NZTDWEU,SM-R900NZAAEUB,SM-R900NZSAEUB,SM-R900NZDAEUB,SM-X700NIDAEUB,SM-X700NZAAEUB,SM-X700NZABEUB,SM-X700NZSAEUB,SM-X700NZSBEUB,SM-X706BZAAEUB,SM-X706BZABEUB,QE65QN95BATXXN,QE75QN95BATXXN,QE85QN95BATXXN,QE65QN800BTXXN,QE75QN800BTXXN,QE85QN800BTXXN,QE65QN900BTXXN,HW-Q990B/XN,HW-Q930B/XN,HW-Q700B/XN&commonCodeYN=N&saleSkuYN=N&onlyRequestSkuYN=Y&keySummaryYN=N&shopSiteCode=nl';

  const [data, setData] = useState('');

  useEffect(() => {
    Axios.get(API_URL).then((res) => {
      setData(res.data?.response.resultData.productList);
    });
  }, []);

  console.log(data);
  return (
    <div>
      <Header />
      <div className="products-wrap">
        {!data
          ? 'Loading'
          : data.map((item) => {
              if (item.categorySubTypeEngName === 'Galaxy Watch') {
                return (
                  <>
                    {item.modelList.map((model) => {
                      return (
                        <WatchCard
                          key={model.id}
                          title={model.displayName}
                          image={model.galleryImage[0]}
                          localBenefitList={item.localBenefitList}
                          stock={model.ctaType}
                          rating={model.ratings}
                          price={model.price}
                          storePromotions={model.storePromotions}
                          reviewCount={model.reviewCount}
                        />
                      );
                    })}
                  </>
                );
              } else if (
                item.categorySubTypeEngName === 'Galaxy Z' ||
                item.categorySubTypeEngName === 'Galaxy S'
              ) {
                return (
                  <>
                    {item.modelList.map((model) => {
                      return (
                        <MobileCard
                          key={model.id}
                          title={model.displayName}
                          stock={model.ctaType}
                          price={model.price}
                          rating={model.ratings}
                          reviewCount={model.reviewCount}
                          storePromotions={model.storePromotions}
                          localBenefitList={item.localBenefitList}
                          image={model.galleryImage[0]}
                        />
                      );
                    })}
                  </>
                );
              } else if (item.categorySubTypeEngName === 'Galaxy Tab S') {
                return (
                  <>
                    {item.modelList.map((model) => {
                      return (
                        <TabletCard
                          key={item.id}
                          title={item.fmyMarketingName}
                          image={model.galleryImage[0]}
                          localBenefitList={item.localBenefitList}
                          storePromotions={model.storePromotions}
                          price={model.price}
                          stock={model.ctaType}
                          rating={model.ratings}
                          reviewCount={model.reviewCount}
                        />
                      );
                    })}
                  </>
                );
              }
            })}
      </div>
    </div>
  );
}
