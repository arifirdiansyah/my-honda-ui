import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDealerships } from "../shared/services/dealershipService";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { get } from "lodash";

export const DealershipPage = () => {
    const dispatch = useDispatch();
    const dealerSelector = useSelector(state => state.DealershipReducer);
    useEffect(() => {
        dispatch(getAllDealerships());
    }, [dispatch]);
    return (<>
        <div className="flex justify-center items-center gap-5 flex-col">
            {get(dealerSelector, 'dealerships', []).map(dealer => {
                return(
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="Dealer cover" style={{maxHeight: 200}} src={dealer.photo} />}
                    >
                        <Meta title={dealer.name} description={dealer.address.city + ', ' + dealer.address.provinces + ` (${dealer.address.subdistrict})`} />
                        <div className="flex gap-3 mt-5">
                            <span>Phone</span>
                            <span>{dealer.phone}</span>
                        </div>
                    </Card>
                )
            })}
        </div>
    </>)
}