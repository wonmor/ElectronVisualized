const connectDevice = async() => {
    const device = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x2fe3 }]
    });

    await device.open();
    await device.selectConfiguration(1);
    await device.claimInterface(0);
};