import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadMotorcycleServiceHistory } from "../shared/services/motorcycleService";
import { get } from "lodash";
import { Button, Card, Divider } from "antd";
import { ServiceDetail } from "../shared/components/ServiceDetail";

export const HistoryServicePage = () => {
    const motorcycleSelector = useSelector(state => state.MotorcycleReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [detailService, setDetailService] = useState(null);

    useEffect(() => {
        if (!motorcycleSelector.motorcycleDetail) {
            navigate('/');
        }
    }, [motorcycleSelector.motorcycleDetail, navigate]);

    useEffect(() => {
        if (motorcycleSelector.motorcycleDetail) {
            dispatch(loadMotorcycleServiceHistory(motorcycleSelector.motorcycleDetail.id));
        }
    }, [motorcycleSelector.motorcycleDetail, dispatch]);


    return (<>
        <div className="flex flex-col justify-center">
            <div className="flex flex-col">
                <div className="flex bg-red-50 p-2">
                    <span className="flex-1 bold">Jenis Kendaraan</span>
                    <span className="flex-1">{get(motorcycleSelector.motorcycleDetail, 'catalogId.modelName')}</span>
                </div>
                <div className="flex bg-gray-50 p-2">
                    <span className="flex-1 bold">Plat Nomor</span>
                    <span className="flex-1">{get(motorcycleSelector.motorcycleDetail, 'vin')}</span>
                </div>
                <div className="flex bg-red-50 p-2">
                    <span className="flex-1 bold">Tahun Perakitan</span>
                    <span className="flex-1">{get(motorcycleSelector.motorcycleDetail, 'buildDate')}</span>
                </div>
                <div></div>
            </div>
            <Divider>{detailService ? 'Detail Perawatan' : 'History Perawatan'}</Divider>
            {detailService ? <ServiceDetail service={detailService} backToServiceList={() => setDetailService(null)}/> :
                <div className="flex-1 flex flex-col justify-center items-center gap-5">
                    {get(motorcycleSelector, 'services', []).length > 0 ? motorcycleSelector.services.map(service => {
                        return (<Card title={get(service, 'serviceDate', '')}
                                      extra={<Button type="link"
                                                     onClick={() => setDetailService(service)}>Detail</Button>}
                                      style={{ width: 300 }}>
                            <p className="uppercase">{get(service, 'dealership.name')}</p>
                            <p className="italic">{get(service, 'servicePackage.packageName')}</p>
                        </Card>)
                    }) : <span>Belum ada history perawatan</span>}
                    <Button type="primary" className="mt-3" onClick={() => navigate('/')}>Kembali</Button>
                </div>}
        </div>
    </>);
}