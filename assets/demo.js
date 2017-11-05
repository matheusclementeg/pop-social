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
        popupTemplate = _getTemplateString(companyData, popupData);
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

const _getTemplateString = (companyData, popupData) => {
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