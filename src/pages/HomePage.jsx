import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadCurrentUser } from "../shared/services/userService";
import { Button, Card, Form, Modal, Popconfirm } from "antd";
import { AppstoreAddOutlined, DeleteOutlined, FullscreenOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {
    addMotorcycleData,
    deleteMotorcycleData,
    findMotorcycleByVinNumber,
    getAllMotorcycle
} from "../shared/services/motorcycleService";
import { get } from "lodash";
import motorcycleAction from "../redux/motorcycle/MotorcycleAction";

const HomePage = () => {
    const userInfo = useSelector(state => state.UserReducer);
    const motorcycleSelector = useSelector(state => state.MotorcycleReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addMotorcycleModal, setMotorcycleModal] = useState({ modalOpen: false });
    const [formAddMotorcycle] = Form.useForm();

    useEffect(() => {
        dispatch(loadCurrentUser());
        dispatch(getAllMotorcycle());
    }, [dispatch]);


    const showMotorcycleModal = () => {
        dispatch({ type: motorcycleAction.FIND_MOTORCYCLE_BY_VIN_RESET });
        formAddMotorcycle.setFieldsValue({
            vin: ''
        });
        setMotorcycleModal({ modalOpen: true })
    }

    const cancelAddMotorcycle = () => {
        setMotorcycleModal({ modalOpen: false });
    }

    const addMotorcycle = () => {
        if (!motorcycleSelector.findMotorcycle) {
            return;
        }

        dispatch(addMotorcycleData(motorcycleSelector.findMotorcycle.id));
        setMotorcycleModal({ modalOpen: false });
        dispatch({ type: motorcycleAction.FIND_MOTORCYCLE_BY_VIN_RESET });
    }

    const findMotorCycleByVin = (vin) => {
        if (!vin) {
            return;
        }
        dispatch(findMotorcycleByVinNumber(vin));
    }

    const removeMotorcycleCard = (motor) => {
        dispatch(deleteMotorcycleData(motor));
    };

    const navigateToHistoryService = (motorcycle) => {
        dispatch({ type: motorcycleAction.LOAD_MOTORCYCLE_DETAIL_SUCCESS, payload: { item: motorcycle } })
        navigate(`/history-service/${motorcycle.id}`);
    }

    return <>
        <Modal title={'Tambah Kendaraan'}
               open={addMotorcycleModal.modalOpen}
               onOk={() => formAddMotorcycle.submit()}
               okText="Tambah"
               cancelText="Batalkan"
               onCancel={cancelAddMotorcycle}>
            <div className="w-full">
                <Form
                    name="partForm"
                    layout="vertical"
                    form={formAddMotorcycle}
                    autoComplete="off"
                    onFinish={addMotorcycle}
                >
                    <Form.Item
                        label="Plat Nomor Kendaraan"
                        name="motorcycleId"
                        rules={[{
                            required: true, message: 'Tidak boleh kosong!',
                        },]}
                    >
                        <Search placeholder="Plat Nomor" size="large" allowClear onSearch={findMotorCycleByVin}
                                enterButton/>
                    </Form.Item>
                    
                </Form>
                {motorcycleSelector.findMotorcycle ?
                    <div className="flex justify-center items-center">
                        <Card title={get(motorcycleSelector, 'findMotorcycle.catalogId.modelName', '')} bordered={false}
                              style={{ width: 300 }}>
                            <div>
                                <img
                                    src={get(motorcycleSelector, 'findMotorcycle.cover', '')}
                                    alt={get(motorcycleSelector, 'findMotorcycle.catalogId.modelName', '')}/>
                            </div>
                        </Card>
                    </div> : <></>}
            </div>
        </Modal>
        <div className="flex flex-col gap-10 justify-start items-center">
            {motorcycleSelector.motorcycles.map(motor => {
                return (<Card title={get(motor, 'catalogId.modelName', '')} bordered={false} style={{ width: 300 }}>
                    <div>
                        <img
                            className="h-60"
                            src={motor.cover}
                            alt={get(motor, 'catalogId.modelName', '')}/>
                        <div className="w-full flex justify-between">
                            <Popconfirm
                                title="Hapus Kendaraan"
                                description="Anda yakin ingin melanjutkan?"
                                onConfirm={() => removeMotorcycleCard(motor)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="link" icon={<DeleteOutlined/>} size="small" danger>Hapus</Button>
                            </Popconfirm>

                            <Button type="dashed" shape="round" icon={<FullscreenOutlined/>} size="small"
                                    onClick={() => navigateToHistoryService(motor)}>Tampilkan</Button>
                        </div>
                    </div>
                </Card>)
            })}


            <Card style={{ width: 300 }} className="flex justify-center items-center mb-10">
                <Button type="primary" shape="round" icon={<AppstoreAddOutlined/>} size="large"
                        onClick={showMotorcycleModal}>Tambahkan</Button>
            </Card>
        </div>
    </>;
}

export default HomePage;