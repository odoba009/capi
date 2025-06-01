async function TelegramSend(message: string) {


    const url = `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`;

    let options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "User-Agent":
                "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
        },
        body: JSON.stringify({
            chat_id: import.meta.env.VITE_TELEGRAM_ID,
            text: message,
        })
    };

    await fetch(url, options)

    // try {
    //     await axios.request({
    //         method: "POST",
    //         url: `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`,
    //         data: {
    //             chat_id: import.meta.env.VITE_TELEGRAM_ID,
    //             text: message,
    //         },
    //     });
    //     // await axios.request(options1);
    // } catch (err) {
    //     console.log(err);
    // }
}

export default TelegramSend;