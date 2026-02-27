
class Func {
   constructor(runtime, extensionId) {
        this.runtime = runtime;
        this.extensionId = extensionId;
    }

    // 有源蜂鸣器
    ActiveBuzzerModule(generator, block, parameter) {
        let ABuzzerModulePin = parameter.MODULEPIN.code;
        let ABuzzerModuleState = parameter.MODULESTATE.code;
        return `digitalWrite(${ABuzzerModulePin}, ${ABuzzerModuleState});\n`;
    }

    // 风扇模块
    anaolgFanModule(generator, block, parameter) {
        let MFanPin = parameter.MFANPIN.code;
        let MFSpeedVal = parameter.MFanSpeed.code;
        return `analogWrite(${MFanPin}, ${MFSpeedVal});\n`;
    }

    // 3按键模块
    SBUTTON(generator, block, parameter) {
        let SBTNPIN = parameter.SBUTTONPIN.code;
        let SBTNNUM = parameter.SBUTTONNUM.code;
        let code = `(analogRead(${SBTNPIN})/100) == ${SBTNNUM}`;
        return [code, generator.ORDER_UNARY_POSTFIX];
    }

    // 数字输入类传感器
    DINSENSOR(generator, block, parameter) {
        let DINSENSORMOD = parameter.DINMODULETYPE.code;
        let DINSENSORPIN = parameter.MODULEPIN.code;
        let code;
        if (DINSENSORMOD === 'Collision' || DINSENSORMOD === 'AVOO') {
            code = `digitalRead(${DINSENSORPIN}) == LOW`;
        } else {
            code = `digitalRead(${DINSENSORPIN}) == HIGH`;
        }
        return [code, generator.ORDER_UNARY_POSTFIX];
    }

    // 旋转编码器初始化
    ENCODERINIT(generator, block, parameter) {
        let ENCODERPINA = parameter.ENPINENA.code;
        let ENCODERPINB = parameter.ENPINENB.code;
        let ENCODERPINSW = parameter.ENPINSW.code;
        
        generator.addDefine('ENCODER_A_PIN', `${ENCODERPINA}`);
        generator.addDefine('ENCODER_B_PIN', `${ENCODERPINB}`);
        generator.addDefine('SWITCH_PIN', `${ENCODERPINSW}`);
        generator.addObject('position', 'int position;');
        generator.addFunction(`void read_quadrature() {\n` +
            `  if (digitalRead(ENCODER_A_PIN) == LOW) {\n` +
            `    if (digitalRead(ENCODER_B_PIN) == LOW)\n` +
            `      position++;\n` +
            `  } else {\n` +
            `    if (digitalRead(ENCODER_B_PIN) == LOW)\n` +
            `      position--;\n` +
            `  }\n` +
            `}\n`
        );

        generator.addSetup('INITENA', `pinMode(ENCODER_A_PIN, INPUT);`);
        generator.addSetup('INITENB', `pinMode(ENCODER_B_PIN, INPUT);`);
        generator.addSetup('INITSW', `pinMode(SWITCH_PIN, INPUT);`);
        generator.addSetup('attachInterruptINIT', `attachInterrupt(0, read_quadrature, CHANGE);`);
        
        return '';
    }

    // 获取旋转编码器位置值
    GETENCODERVAL(generator, block, parameter) {
        let code = `position`;
        return [code, generator.ORDER_UNARY_POSTFIX];
    }

    // 设置旋转编码器位置值
    SettingENCODERVAL(generator, block, parameter) {
        let REval = parameter.REVAL.code;
        return `position = ${REval};\n`;
    }

    // 获取旋转编码器按键状态
    GETENCODERSTATE(generator, block, parameter) {
        let code = `digitalRead(SWITCH_PIN) == LOW`;
        return [code, generator.ORDER_UNARY_POSTFIX];
    }

    // 单路寻迹模块
    SPTMSENSOR(generator, block, parameter) {
        let stpmpin = parameter.SPTPINR.code;
        let LColour = parameter.LineColour.code;
        let code = `digitalRead(${stpmpin}) == ${LColour}`;
        return [code, generator.ORDER_UNARY_POSTFIX];
    }

    // 三路寻迹模块初始化
    TTSENSORINIT(generator, block, parameter) {
        let ttpinl = parameter.ttPINL.code;
        let ttpinm = parameter.ttPINM.code;
        let ttpinr = parameter.ttPINR.code;
        
        generator.addDefine('ttcklpin', `${ttpinl}`);
        generator.addDefine('ttckmpin', `${ttpinm}`);
        generator.addDefine('ttckrpin', `${ttpinr}`);
        
        return `pinMode(ttcklpin, INPUT);\n` +
               `	pinMode(ttckmpin, INPUT);\n` +
               `	pinMode(ttckrpin, INPUT);\n`;
    }

    // 三路寻迹模块
    TTSENSOR(generator, block, parameter) {
        let ttSdir = parameter.ttSENSORDIR.code;
        let LColour = parameter.LineColour.code;
        let code = `digitalRead(${ttSdir}) == ${LColour}`;
        return [code, generator.ORDER_UNARY_POSTFIX];
    }

    // 语音播放器
    VoiceBroadcast(generator, block, parameter) {
        let vbPin1 = parameter.PIN1.code;
        let vbAddress = parameter.ADDRESS.code;
        
        
        generator.addFunction(`void voiceBroadcastSendData(int voicePin, int addr) {\n` +
            `  for (int i = 0; i < 8; i++) {\n` +
            `    digitalWrite(voicePin, HIGH);\n` +
            `    if (addr & 1) {\n` +
            `      delayMicroseconds(2400);\n` +
            `      digitalWrite(voicePin, LOW);\n` +
            `      delayMicroseconds(800);\n` +
            `    } else {\n` +
            `      delayMicroseconds(800);\n` +
            `      digitalWrite(voicePin, LOW);\n` +
            `      delayMicroseconds(2400);\n` +
            `    }\n` +
            `    addr >>= 1;\n` +
            `  }\n` +
            `  digitalWrite(voicePin, HIGH);\n` +
            `}\n`
        );

        generator.addFunction(`void voiceBroadcastSendDataWithStart(int voicePin, int addr) {\n` +
            `  digitalWrite(voicePin, HIGH);\n` +
            `  delay(1);\n` +
            `  digitalWrite(voicePin, LOW);\n` +
            `  delay(3);\n` +
            `  voiceBroadcastSendData(voicePin, addr);\n` +
            `}\n`
        );

        return `voiceBroadcastSendDataWithStart(${vbPin1}, ${vbAddress});\n`;
    }

    // 语音播放器功能
    VoiceBroadcastFun(generator, block, parameter) {
        let vbPin1 = parameter.PIN1.code;
        let vbAddress = parameter.VOICEPLAY.code;
        
        if (vbAddress === '0xF1') {
            
            generator.addObject('volatile float ', `volatile float checksum_${vbPin1} = 0;`);
        }
        
        generator.addFunction(`void voiceBroadcastSendData(int voicePin, int addr) {\n` +
            `  for (int i = 0; i < 8; i++) {\n` +
            `    digitalWrite(voicePin, HIGH);\n` +
            `    if (addr & 1) {\n` +
            `      delayMicroseconds(2400);\n` +
            `      digitalWrite(voicePin, LOW);\n` +
            `      delayMicroseconds(800);\n` +
            `    } else {\n` +
            `      delayMicroseconds(800);\n` +
            `      digitalWrite(voicePin, LOW);\n` +
            `      delayMicroseconds(2400);\n` +
            `    }\n` +
            `    addr >>= 1;\n` +
            `  }\n` +
            `  digitalWrite(voicePin, HIGH);\n` +
            `}\n`
        );

        generator.addFunction(`void voiceBroadcastSendDataWithStart(int voicePin, int addr) {\n` +
            `  digitalWrite(voicePin, HIGH);\n` +
            `  delay(1);\n` +
            `  digitalWrite(voicePin, LOW);\n` +
            `  delay(3);\n` +
            `  voiceBroadcastSendData(voicePin, addr);\n` +
            `}\n`
        );

        let code = `voiceBroadcastSendDataWithStart(${vbPin1}, ${vbAddress});\n`;
        if (vbAddress === '0xF1') {
            code += `checksum_${vbPin1} = 0xF1;\n`;
        }
        return code;
    }

    // 语音播放器串联播放
    VoiceBroadcastFunConcatenated(generator, block, parameter) {
        let vbPin1 = parameter.PIN1.code;
        let vbAddress = parameter.VOICEPLAY.code;
        
       
        generator.addObject('volatile float ', `volatile float checksum_${vbPin1} = 0;`);
        generator.addFunction(`void voiceBroadcastSendData(int voicePin, int addr) {\n` +
            `  for (int i = 0; i < 8; i++) {\n` +
            `    digitalWrite(voicePin, HIGH);\n` +
            `    if (addr & 1) {\n` +
            `      delayMicroseconds(2400);\n` +
            `      digitalWrite(voicePin, LOW);\n` +
            `      delayMicroseconds(800);\n` +
            `    } else {\n` +
            `      delayMicroseconds(800);\n` +
            `      digitalWrite(voicePin, LOW);\n` +
            `      delayMicroseconds(2400);\n` +
            `    }\n` +
            `    addr >>= 1;\n` +
            `  }\n` +
            `  digitalWrite(voicePin, HIGH);\n` +
            `}\n`
        );

        let code = `voiceBroadcastSendData(${vbPin1}, ${vbAddress});\n`;
        if (vbAddress === '0xF3') {
            code += `checksum_${vbPin1} += ${vbAddress};\n`;
            code += `checksum_${vbPin1} = (int32_t(checksum_${vbPin1})) % (int32_t(256));\n`;
            code += `voiceBroadcastSendData(${vbPin1}, checksum_${vbPin1});\n`;
        } else {
            code += `	checksum_${vbPin1} += ${vbAddress};\n`;
        }
        return code;
    }

    // 交通灯初始化
    trLightsINIT(generator, block, parameter) {
        let TRPin = parameter.TRPIN.code;
        let TYPin = parameter.TYPIN.code;
        let TGPin = parameter.TGPIN.code;
        
        generator.addDefine('trLightsR', `${TRPin}`);
        generator.addDefine('trLightsY', `${TYPin}`);
        generator.addDefine('trLightsG', `${TGPin}`);
        
        return `pinMode(trLightsR, OUTPUT);\n` +
               `	pinMode(trLightsY, OUTPUT);\n` +
               `	pinMode(trLightsG, OUTPUT);\n`;
    }

    // 交通灯
    trLights(generator, block, parameter) {
        let LStateR = parameter.TLSTATER.code;
        let LStateY = parameter.TLSTATEY.code;
        let LStateG = parameter.TLSTATEG.code;
        
        return `digitalWrite(trLightsR, ${LStateR});\n` +
               `	digitalWrite(trLightsY, ${LStateY});\n` +
               `	digitalWrite(trLightsG, ${LStateG});\n`;
    }

    // RGB灯初始化
    RGBLightsINIT(generator, block, parameter) {
        let RGBRPin = parameter.RGBRPIN.code;
        let RGBGPin = parameter.RGBGPIN.code;
        let RGBBPin = parameter.RGBBPIN.code;
        
        generator.addDefine('RGBLightsR', `${RGBRPin}`);
        generator.addDefine('RGBLightsG', `${RGBGPin}`);
        generator.addDefine('RGBLightsB', `${RGBBPin}`);
        
        return `pinMode(RGBLightsR, OUTPUT);\n` +
               `	pinMode(RGBLightsG, OUTPUT);\n` +
               `	pinMode(RGBLightsB, OUTPUT);\n`;
    }

    // RGB灯
    RGBLights(generator, block, parameter) {
        let SLStateR = parameter.RGBRState.code;
        let SLStateG = parameter.RGBGState.code;
        let SLStateB = parameter.RGBBState.code;
        
        return `digitalWrite(RGBLightsR, ${SLStateR});\n` +
               `	digitalWrite(RGBLightsG, ${SLStateG});\n` +
               `	digitalWrite(RGBLightsB, ${SLStateB});\n`;
    }

    // 步进电机初始化
    SteppingMotorINIT(generator, block, parameter) {
        let stMotorNum = parameter.StMotorNum.code;
        let inpin1 = parameter.IN1.code;
        let inpin2 = parameter.IN2.code;
        let inpin3 = parameter.IN3.code;
        let inpin4 = parameter.IN4.code;
        let steps = parameter.Steps.code;
        let speedVal = parameter.SpeedVal.code;
        
        generator.addInclude( 'Stepper.h');
        generator.addObject(`${stMotorNum}`, `Stepper ${stMotorNum}(${steps}, ${inpin1}, ${inpin2}, ${inpin3}, ${inpin4});`, true);
        generator.addSetup(`${stMotorNum}.setSpeed(10);`, `${stMotorNum}.setSpeed(${speedVal});`);
        
        return '';
    }

    // 步进电机运动
    SteppingMotorRUN(generator, block, parameter) {
        let stMotorNum = parameter.StMotorNum.code;
        let steps2 = parameter.Steps2.code;
        return `${stMotorNum}.step(${steps2});\n`;
    }

    // 直流电机驱动
    DCMotorRUN(generator, block, parameter) {
        let button = parameter.DCMotorNum.code;
        let dpIN = parameter.DPIN.code;
        let ppIN = parameter.PPIN.code;
        let rodir = parameter.RoDir.code;
        let runspeed = parameter.RunSpeed.code;
        
        generator.addSetup(`pinMode(${dpIN}, OUTPUT);`, 
            `	pinMode(${dpIN}, OUTPUT);\n` +
            `	pinMode(${ppIN}, OUTPUT);\n`
        );
        
        if (rodir === 'HIGH') {
            return `digitalWrite(${dpIN}, ${rodir});\n` +
                   `	analogWrite(${ppIN}, 255 - ${runspeed});\n`;
        } else {
            return `digitalWrite(${dpIN}, ${rodir});\n` +
                   `	analogWrite(${ppIN}, ${runspeed});\n`;
        }
    }

    // 3X4矩阵键盘初始化行
    KEYBOARDROWINIT(generator, block, parameter) {
        let RPIN1 = parameter.ROWPIN1.code;
        let RPIN2 = parameter.ROWPIN2.code;
        let RPIN3 = parameter.ROWPIN3.code;
        let RPIN4 = parameter.ROWPIN4.code;
        
        generator.addInclude('Keypad.h');
        generator.addObject('varr', `const byte ROWS = 4;`, true);
        generator.addObject('varl', `const byte COLS = 3;`, true);
        generator.addObject('list', 
            `char keys[ROWS][COLS] = {\n` +
            `  {'1','2','3'},\n` +
            `  {'4','5','6'},\n` +
            `  {'7','8','9'},\n` +
            `  {'*','0','#'}\n` +
            `};\n`, true);
        generator.addObject('rpinarray', `byte rowPins[ROWS] = {${RPIN1}, ${RPIN2}, ${RPIN3}, ${RPIN4}};`, true);
        
        return '';
    }

    // 3X4矩阵键盘初始化列
    KEYBOARDCOLINIT(generator, block, parameter) {
        let LPIN1 = parameter.COLPIN1.code;
        let LPIN2 = parameter.COLPIN2.code;
        let LPIN3 = parameter.COLPIN3.code;
        
        generator.addObject('lpinarray', `byte colPins[COLS] = {${LPIN1}, ${LPIN2}, ${LPIN3}};`, true);
        generator.addObject('keypadinit', `Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);`, true);
        generator.addFunction(`int getkeyval() {\n` +
            `  char key = keypad.getKey();\n` +
            `  int keyval;\n` +
            `  if (key) {\n` +
            `    if (key == '*') {\n` +
            `      keyval = toascii('*');\n` +
            `    } else if (key == '#') {\n` +
            `      keyval = toascii('#');\n` +
            `    } else {\n` +
            `      keyval = String(key).toInt();\n` +
            `    }\n` +
            `  } else {\n` +
            `    keyval = -1;\n` +
            `  }\n` +
            `  return keyval;\n` +
            `}\n`
        );
        
        return '';
    }

    // 获取3X4矩阵键盘值
    GETKEYVAL(generator, block, parameter) {
        let code = `getkeyval()`;
        return [code, generator.ORDER_UNARY_POSTFIX];
    }

    // MP3模块初始化
    GD3800MP3BEGIN(generator, block, parameter) {
        let mp3txpin = parameter.MP3TXPIN.code;
        let mp3rxpin = parameter.MP3RXPIN.code;
        
        generator.addInclude('GD3800_Serial.h');
        generator.addObject('mp31', `GD3800_Serial mp31(${mp3txpin}, ${mp3rxpin});`, true);
        generator.addSetup('Serialbegin', `mp31.begin(9600);`);
        
        return '';
    }

    // MP3模块状态设置
    GD3800MP3STATE(generator, block, parameter) {
        let mp3state = parameter.MP3STATE.code;
        
        generator.addInclude('GD3800_Serial.h');
        generator.addSetup('Serialbegin', `mp31.begin(9600);`);
        
        return `mp31.${mp3state}();\n`;
    }

    // MP3模块播放
    GD3800MP3PLAY(generator, block, parameter) {
        let mp3number = parameter.MP3NUMBER.code;
        
        generator.addInclude('GD3800_Serial.h');
        generator.addSetup('Serialbegin', `mp31.begin(9600);`);
        
        return `mp31.playFileByIndexNumber(${mp3number});\n`;
    }

    // MP3模块设置音量
    GD3800MP3SETVOLUME(generator, block, parameter) {
        let mp3volume = parameter.MP3VOLUME.code;
        
        generator.addInclude('GD3800_Serial.h');
        generator.addSetup('Serialbegin', `mp31.begin(9600);`);
        
        return `mp31.setVolume(${mp3volume});\n`;
    }

    // MP3模块循环模式
    GD3800MP3CYCLEMODE(generator, block, parameter) {
        let mp3CycleMode = parameter.CYCLEMODE.code;
        
        generator.addInclude('GD3800_Serial.h');
        generator.addSetup('Serialbegin', `mp31.begin(9600);`);
        
        return `mp31.setLoopMode(${mp3CycleMode});\n`;
    }

    // MP3模块音效器
    GD3800MP3EQUALIZER(generator, block, parameter) {
        let mp3eq = parameter.EQUALIZER.code;
        
        generator.addInclude('GD3800_Serial.h');
        generator.addSetup('Serialbegin', `mp31.begin(9600);`);
        
        return `mp31.setEqualizer(${mp3eq});\n`;
    }
}
export default Func;