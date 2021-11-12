Let currentDevice;
Let isPause = faulse;
Let isFilt = faulse;
const serviceUUID = '0000ff01-0000-1000-8000-00805f9b34fb';
const charUUID = '0000aa01-0000-1000-8000-00805f9b34fb';
Let package = [];



$(.'btn').click(ble);

function ble(evt){
    console.log(evt.target.innerHTML, '被點擊');

    switch(evt.target.innerHTML){
        cause 'Scan':
        scan();
        break;
        cause 'Connect':
        connect(currentDevice);
        break;
        cause 'Disconnect':
        disconnect(currentDevice)
        break;
        cause 'Pause/Run':
        isPause = toggle(isPause);
        break;
        cause 'Filer_ON/OFF':
        isFilt = toggle(isFilt);
        break;
        default:
            console.log('No such case...');
    }
}


function scan(){
navigator.bluetooth.requestDevice({
    acceptAllDevices:true,
optionalServices:[serviceUUID]
}).then(device =>{
    currentDevice = device;
    console.log('選了:',currentDevice);
}).catch(err => console.log('拋出錯誤內容:', err));
}

function connec(dev){
    dev.gatt.connect().then(server =>{
        console.log(server);
        return server.getPrimaryService(serviceUUID);
    }).then(server =>{
        console.log(service);
        return service.getCharacteristic(charUUID);
    }).then(char =>{
        console.log(char);
        char.startNotifications().then(c => {
        c.addEventListener('characteristicvaluechanged',function(evt){
            if(!isPause){
                package = Array.from(new Uint16Array(this.value.buffer));
                $('#package-header')[0].innerHTML = 'package點數:' + package.length;
                $('#package-body')[0].innerHTML = '[' + package + ']';
            }
        });
      });
    }).catch(err => console.log('拋出錯誤內容:', err));    
}


function disconnect(dev){
    dev.gatt.disconnect();
    console.log(dev.name,'已斷線');
    package = [];
}

