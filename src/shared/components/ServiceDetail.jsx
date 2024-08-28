import { get } from "lodash";
import { Button, Divider } from "antd";

const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};

export const ServiceDetail = ({ service, backToServiceList }) => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex bg-gray-300 p-2">
                    <span className="flex-1 bold">Tanggal Service</span>
                    <span className="flex-1">{get(service, 'serviceDate')}</span>
                </div>
                <div className="flex bg-red-300 p-2">
                    <span className="flex-1 bold">Tanggal Service Selanjutnya</span>
                    <span className="flex-1">{get(service, 'nextServiceDate')}</span>
                </div>
                <div className="flex bg-gray-50 p-2">
                    <span className="flex-1 bold">Dealer</span>
                    <span className="flex-1">{get(service, 'dealership.name')}</span>
                </div>
                <div className="flex bg-gray-300 p-2">
                    <span className="flex-1 bold">Tahuin Perakitan</span>
                    <span className="flex-1">{get(service, 'serviceDate')}</span>
                </div>
                <div className="flex bg-gray-50 p-2">
                    <span className="flex-1 bold">Paket Service</span>
                    <span className="flex-1">{get(service, 'servicePackage.packageName')}</span>
                </div>
                <div className="flex bg-gray-300 p-2">
                    <span className="flex-1 bold">Nama Teknisi</span>
                    <span className="flex-1">{get(service, 'technician')}</span>
                </div>
                <div className="flex bg-gray-50 p-2">
                    <span className="flex-1 bold">Total Biaya</span>
                    <span className="flex-1">{formatRupiah(get(service, 'totalPrice', 0))}</span>
                </div>
                <Divider>Pergantian Sukucadang</Divider>
                <div className="flex flex-col gap-3">
                    {get(service, 'replacedParts', []).map((part, index) => {
                        return (
                            <div className="flex flex-col border-2 rounded-xl border-gray-300 p-2" key={index}>
                                <span className="flex-1">{get(part, 'part.partName', '')}</span>
                                <span className="flex-1 font-bold">{get(part, 'part.partNumber', '')}</span>
                            </div>
                        );
                    })}
                </div>
                <Button type="primary" className="mt-3" onClick={backToServiceList}>Kembali</Button>
            </div>
        </>
    );
};
