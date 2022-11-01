import logo from './logo.svg';
import './App.css';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Upload, Modal, Button} from 'antd';
import React, {useState} from 'react';


function App() {
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [base64, setBase64] = useState('')
    let BASE64 = '';
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({fileList: newFileList}) => {
        setFileList(newFileList)
    };
    const logBase64 = () => {
        BASE64 = fileList[0]?.thumbUrl;
        console.log("BASE64", BASE64)
        console.log("base64", fileList[0]?.thumbUrl)
        setBase64(fileList[0]?.thumbUrl)

    };
    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>

                <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    // onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Button onClick={logBase64}>
                    打印base64
                </Button>
                {/*<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>*/}
                {/*    <img*/}
                {/*        alt="example"*/}
                {/*        style={{*/}
                {/*            width: '100%',*/}
                {/*        }}*/}
                {/*        src={previewImage}*/}
                {/*    />*/}
                {/*</Modal>*/}

                {/*<p>*/}
                {/*  Edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}
                {/*<a*/}
                {/*  className="App-link"*/}
                {/*  href="https://reactjs.org"*/}
                {/*  target="_blank"*/}
                {/*  rel="noopener noreferrer"*/}
                {/*>*/}
                {/*  Learn React*/}
                {/*</a>*/}
            </header>
        </div>

    );
}

export default App;
