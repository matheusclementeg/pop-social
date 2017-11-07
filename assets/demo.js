function prepareClipboardButton() {
    const clipboard = new Clipboard('#copy-button');

    clipboard.on('success', function(e) {
        console.log(e);
    });
    
    clipboard.on('error', function(e) {
        swal(
            'Erro :(',
            'Encontramos um problema ao copiar o código. Tente novamente mais tarde.',
            'error'
        );
    });
}
function generatePopupCode() {
    /* Company data */
    const companyData = {
        fbField: document.getElementById('fb-field').value,
        wppField: document.getElementById('wpp-field').value
    };

    /* Popup data */
    const popupData = {
        popupHeader: document.getElementById('pop-header').value,
        popupMessage: document.getElementById('pop-msg').value,
        popupColor: document.getElementById('pop-color').value
    };

    const fieldValidation = _getFieldsValidation(companyData, popupData);

    let popupTemplate;
    if (fieldValidation.isValid) {
        popupTemplate = _getTemplate(companyData, popupData);
        swal(
            'Código copiado com sucesso',
            'Cole o código gerado dentro da sua tag <i>body</i> e seja feliz :)',
            'success'
        );
    } else {
        popupTemplate = fieldValidation.message;
        swal(
            'Ops...',
            'Preencha todos os dados para prosseguir :)',
            'warning'
        );
    }
    document.getElementById('popup-code').value = popupTemplate;
}

const _getFieldsValidation = (companyData, popupData) => {
    let validation = {isValid: true};

    if (!companyData.fbField || !companyData.wppField) {
        validation = {
            isValid: false,
            message: 'Preencha todos os campos da empresa para prosseguir.'
        };
    } else if (!popupData.popupHeader || !popupData.popupMessage || !popupData.popupColor) {
        validation = {
            isValid: false,
            message: 'Preencha todos os campos do popup para prosseguir.'
        };
    }

    return validation;
};

const _getTemplate = (companyData, popupData) => {
    return `
        <div id="popx"> <div id="popx-popup" class="popup-container"> <div class="header"> <span>${popupData.popupHeader}</span> </div> <div id="popx-close" class="close"> <i class="fa fa-times"></i> </div> <span class="popup-label">${popupData.popupMessage}</span> <br> <div class="content"> <div class="col"> <a href="https://api.whatsapp.com/send?1=pt_BR&phone=55${companyData.wppField}" target="_blank" class="whatsapp"> <i class="fa fa-whatsapp"></i> Conversar </a> </div> <div class="col"> <a href="https://m.me/${companyData.fbField}" target="_blank" class="facebook"> <i class="fa fa-facebook"></i> Conversar </a> </div> </div> </div> <style> .popup-container { position: fixed; max-width: 350px; background: rgba(236, 240, 241,1); border: 7px solid #38CBD3; background-color: #38CBD3; bottom: 0; margin-left: -425px; box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16); border-radius: 8px; -webkit-transition: all 1s ease; -moz-transition: all 1s ease; -o-transition: all 1s ease; transition: all 1s ease; } .popup-container .header { text-align: center; position: relative; background: #38cbd3; color: #fafafa; font-size: 16px; font-weight: 600; letter-spacing: 1px; display: inline-block; width: 100%; padding: 12px 0; } .popup-container .close { color: #fafafa; right: 8px; top: 0px; position: absolute; font-size: 20px; cursor: pointer; padding: 8px 0; } .popup-container .popup-label { font-size: 17px; color: #fafafa; line-height: 24px; font-weight: 400; text-align: center; margin-top: 20px; padding: 0 20px; display: block; } .popup-container a.whatsapp, a.facebook { text-decoration: none !important; text-align: center; color: #fff !important; border-radius: 4px; padding: 8px 0; display: block; } .popup-container a.whatsapp { border-bottom: 2px solid #1bc65a; background: #25D366; } .popup-container a.facebook { border-bottom: 2px solid #415e93; background: #4b6598; } #popx-plus { position: fixed; color: #fff; bottom: 15%; font-size: 25px; margin-left: -425px; -webkit-transition: all 1.25s ease; -moz-transition: all 1.25s ease; -o-transition: all 1.25s ease; transition: all 1.25s ease; cursor: pointer; text-align: left; letter-spacing: 1px; left: 0; } #popx-plus span { position: absolute; margin-top: 38px; left: 4px; } #popx-plus::after { content: ''; display: block; display: relative; border-top: 55px solid transparent; border-bottom: 55px solid transparent; border-left: 55px solid #38cbd3; } .popup-container .content { text-align: center; padding-bottom: 20px; } .popup-container .content .col { display: inline-block; width: 40%; } </style> <div id="popx-plus"> <script type="text/javascript"> function preparePopX() { const scrollTop = document.documentElement.scrollTop; const popUp = document.getElementById('popx-popup'); const plus = document.getElementById('popx-plus'); if (scrollTop >= 500) { popUp.style.marginLeft = '25px'; plus.style.marginLeft = '-425px'; } if (scrollTop <= 600) { popUp.style.marginLeft = '-425px'; plus.style.marginLeft = '0px'; } plus.addEventListener('click', () => { popUp.style.marginLeft = '0px'; plus.style.marginLeft = '-425px'; }); document.getElementById('popx-close').addEventListener('click', () => { popUp.style.marginLeft = '-425px'; plus.style.marginLeft = '0px'; }); } preparePopX(); </script> <span> <i class="fa fa-comments"></i> </span> </div> </div>
    `;
}


const getUncompressedTemplate = (companyData, popupData) => {
    return `
        <div id="popx">
            <div id="popx-popup" class="popup-container">
                <div class="header">
                    <span>${popupData.popupHeader}</span>
                </div>
                <div id="popx-close" class="close">
                    <i class="fa fa-times"></i>
                </div>
                <span class="popup-label">${popupData.popupMessage}</span>
                <br>
                <div class="content">
                    <div class="col">
                        <a href="https://api.whatsapp.com/send?1=pt_BR&phone=55${companyData.wppField}" target="_blank" class="whatsapp">
                            <i class="fa fa-whatsapp"></i>
                            Conversar
                        </a>
                    </div>
                    <div class="col">
                        <a href="https://m.me/${companyData.fbField}" target="_blank" class="facebook">
                            <i class="fa fa-facebook"></i>
                            Conversar
                        </a>
                    </div>
                </div>
            </div>
            <style>
                .popup-container {
                    position: fixed;
                    max-width: 350px;
                    background: rgba(236, 240, 241,1);
                    border: 7px solid #38CBD3;
                    background-color: #38CBD3;
                    bottom: 0;
                    margin-left: -425px;
                    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
                    border-radius: 8px;
                    -webkit-transition: all 1s ease;
                    -moz-transition: all 1s ease;
                    -o-transition: all 1s ease;
                    transition: all 1s ease;
                }

                .popup-container .header {
                    text-align: center;
                    position: relative;
                    background: #38cbd3;
                    color: #fafafa;
                    font-size: 16px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    display: inline-block;
                    width: 100%;
                    padding: 12px 0;
                }

                .popup-container .close {
                    color: #fafafa;
                    right: 8px;
                    top: 0px;
                    position: absolute;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 8px 0;
                }

                .popup-container .popup-label {
                    font-size: 17px;
                    color: #fafafa;
                    line-height: 24px;
                    font-weight: 400;
                    text-align: center;
                    margin-top: 20px;
                    padding: 0 20px;
                    display: block;
                }

                .popup-container a.whatsapp, a.facebook {
                    text-decoration: none !important;
                    text-align: center;
                    color: #fff !important;
                    border-radius: 4px;
                    padding: 8px 0;
                    display: block;
                }

                .popup-container a.whatsapp {
                    border-bottom: 2px solid #1bc65a;
                    background: #25D366;
                }

                .popup-container a.facebook {
                    border-bottom: 2px solid #415e93;
                    background: #4b6598;
                }
                    
                #popx-plus {
                    position: fixed;
                    color: #fff;
                    bottom: 15%;
                    font-size: 25px;
                    margin-left: -425px;
                    -webkit-transition: all 1.25s ease;
                    -moz-transition: all 1.25s ease;
                    -o-transition: all 1.25s ease;
                    transition: all 1.25s ease;
                    cursor: pointer;
                    text-align: left;
                    letter-spacing: 1px;
                    left: 0;
                }

                #popx-plus span {
                    position: absolute;
                    margin-top: 38px;
                    left: 4px;
                }

                #popx-plus::after {
                    content: '';
                    display: block;
                    display: relative;
                    border-top: 55px solid transparent;
                    border-bottom: 55px solid transparent;
                    border-left: 55px solid #38cbd3;
                }

                .popup-container .content {
                    text-align: center;
                    padding-bottom: 20px;
                }

                .popup-container .content .col {
                    display: inline-block;
                    width: 40%;
                }
            </style>
            <div id="popx-plus">
                <script type="text/javascript">
                    function preparePopX() {
                        const scrollTop = document.documentElement.scrollTop;
                        const popUp = document.getElementById('popx-popup');
                        const plus = document.getElementById('popx-plus');
                        
                        if (scrollTop >= 500) {
                            popUp.style.marginLeft = '25px';
                            plus.style.marginLeft = '-425px';
                        }
                        if (scrollTop <= 600) {
                            popUp.style.marginLeft = '-425px';
                            plus.style.marginLeft = '0px';
                        }
                    
                        plus.addEventListener('click', () => {
                            popUp.style.marginLeft = '0px';
                            plus.style.marginLeft = '-425px';
                        });
                    
                        document.getElementById('popx-close').addEventListener('click', () => {
                            popUp.style.marginLeft = '-425px';
                            plus.style.marginLeft = '0px';
                        });
                    }
                    
                    preparePopX();
                </script>
                <span>
                    <i class="fa fa-comments"></i>
                </span>
            </div>
        </div>
    `;
}