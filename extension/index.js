import ArgumentType from '../utils/argument-type';
import BlockType from '../utils/block-type';
import DataType from '../utils/data-type';
import blockIconURI from './image/blockicon.svg';
import menuIconURI from './image/menuicon.svg';
import Func from './func';
import {setLocaleData, formatMessage, setLocale} from '../utils/translation';
import LocaleData from "./locales"
setLocaleData(LocaleData)

class LZBoardKit {
    constructor(runtime, extensionId) {
        this.runtime = runtime;
        // Arduino模式的执行方法
        this.funcs = new Func(runtime, extensionId);
    }

    // 切换翻译的钩子
    setLocale(locale) {
        setLocale(locale);
    }

    // 固定函数名, Arduino返回block的生成代码方法
    getCodePrimitives() {
        return this.funcs;
    }

    // 固定函数名, 返回block信息, 必须有该方法
    getInfo() {
        return {
            name: formatMessage({
                id: 'gui.blocklyText.lzboardkit.name',
                default: '乐造套件库'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blockIconWidth: 50,
            blockIconHeight: 40,
            color1: '#FF9912',
            color2: '#FF8800',
            color3: '#FF7700',
            blocks: [
                {
                    opcode: 'ActiveBuzzerModule',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.ActiveBuzzerModule',
                        default: '有源蜂鸣器 引脚[MODULEPIN] 状态[MODULESTATE]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MODULEPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '2'
                        },
                        MODULESTATE: {
                            type: ArgumentType.STRING,
                            menu: 'MODULESTATEVAL',
                            defaultValue: 'HIGH'
                        }
                    }
                },
                {
                    opcode: 'anaolgFanModule',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.anaolgFanModule',
                        default: '风扇模块 引脚[MFANPIN] 设定转速值[MFanSpeed]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MFANPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_AnalogWrite',
                            defaultValue: '3'
                        },
                        MFanSpeed: {
                            type: ArgumentType.SLIDER,
                            inputParams: {
                                rangeMax: 255,
                                rangeMin: 0
                            },
                            defaultValue: 200,
                            inputTypes: [...DataType.NUMBER]
                        }
                    }
                },
                {
                    opcode: 'SBUTTON',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.SBUTTON',
                        default: '3按键模块 引脚[SBUTTONPIN] [SBUTTONNUM]被按下'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        SBUTTONPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_AnalogRead',
                            defaultValue: 'A0'
                        },
                        SBUTTONNUM: {
                            type: ArgumentType.STRING,
                            menu: 'SBUTTONNUMBER',
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'DINSENSOR',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.DINSENSOR',
                        default: '[DINMODULETYPE] 引脚[MODULEPIN]检测到物体/人'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        DINMODULETYPE: {
                            type: ArgumentType.STRING,
                            menu: 'DINMODULETYPEVAL',
                            defaultValue: 'USHSENSRO'
                        },
                        MODULEPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '2'
                        }
                    }
                },
                {
                    opcode: 'ENCODERINIT',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.ENCODERINIT',
                        default: '旋转编码器初始化 设置引脚ENA[ENPINENA] ENB[ENPINENB] SW[ENPINSW]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ENPINENA: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_ISR',
                            defaultValue: '2'
                        },
                        ENPINENB: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_ISR',
                            defaultValue: '3'
                        },
                        ENPINSW: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '8'
                        }
                    }
                },
                {
                    opcode: 'GETENCODERVAL',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.GETENCODERVAL',
                        default: '获取旋转编码器位置值'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'SettingENCODERVAL',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.SettingENCODERVAL',
                        default: '设置旋转编码器位置值[REVAL]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        REVAL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'GETENCODERSTATE',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.GETENCODERSTATE',
                        default: '旋转编码器按键被按下？'
                    }),
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'SPTMSENSOR',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.SPTMSENSOR',
                        default: '单路寻迹模块 引脚[SPTPINR] 检测到[LineColour]'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        SPTPINR: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '2'
                        },
                        LineColour: {
                            type: ArgumentType.STRING,
                            menu: 'TLColour',
                            defaultValue: 'HIGH'
                        }
                    }
                },
                {
                    opcode: 'TTSENSORINIT',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.TTSENSORINIT',
                        default: '三路寻迹初始化 右寻迹(R)[ttPINR] 中间寻迹(M)[ttPINM] 左寻迹(L)[ttPINL]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ttPINR: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '8'
                        },
                        ttPINM: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '3'
                        },
                        ttPINL: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '2'
                        }
                    }
                },
                {
                    opcode: 'TTSENSOR',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.TTSENSOR',
                        default: '三路寻迹 [ttSENSORDIR] 检测到[LineColour]'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        ttSENSORDIR: {
                            type: ArgumentType.STRING,
                            menu: 'TTDIR',
                            defaultValue: 'ttcklpin'
                        },
                        LineColour: {
                            type: ArgumentType.STRING,
                            menu: 'TLColour',
                            defaultValue: 'HIGH'
                        }
                    }
                },
                {
                    opcode: 'VoiceBroadcast',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.VoiceBroadcast',
                        default: '语音播放器 [PIN1] 播放 [ADDRESS]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PIN1: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '2'
                        },
                        ADDRESS: {
                            type: ArgumentType.STRING,
                            menu: 'VoicePlayerList',
                            defaultValue: '0x00'
                        }
                    }
                },
                {
                    opcode: 'VoiceBroadcastFun',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.VoiceBroadcastFun',
                        default: '语音播放器 [PIN1] 播放 [VOICEPLAY]'
                    }),
                    blockType: BlockType.COMMAND,
                    
                    arguments: {
                        PIN1: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '2'
                        },
                        VOICEPLAY: {
                            type: ArgumentType.STRING,
                            menu: 'VoicePlayerFun',
                            defaultValue: '0xE0'
                        }
                    }
                },
                {
                    opcode: 'VoiceBroadcastFunConcatenated',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.VoiceBroadcastFunConcatenated',
                        default: '语音播放器 [PIN1] 连码 [VOICEPLAY]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PIN1: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '2'
                        },
                        VOICEPLAY: {
                            type: ArgumentType.STRING,
                            menu: 'VoicePlayerList2',
                            defaultValue: '0x00'
                        }
                    }
                },
                {                    
                    opcode: 'trLightsINIT',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.trLightsINIT',
                        default: '交通灯初始化 红灯(R)[TRPIN] 黄灯(Y)[TYPIN] 绿灯(G)[TGPIN]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TRPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '2'
                        },
                        TYPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '3'
                        },
                        TGPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '8'
                        }
                    }
                },
                {
                    opcode: 'trLights',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.trLights',
                        default: '交通灯 红灯[TLSTATER] 黄灯[TLSTATEY] 绿灯[TLSTATEG]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TLSTATER: {
                            type: ArgumentType.STRING,
                            menu: 'trLightsState',
                            defaultValue: 'HIGH'
                        },
                        TLSTATEY: {
                            type: ArgumentType.STRING,
                            menu: 'trLightsState',
                            defaultValue: 'HIGH'
                        },
                        TLSTATEG: {
                            type: ArgumentType.STRING,
                            menu: 'trLightsState',
                            defaultValue: 'HIGH'
                        }
                    }
                },
                {                    opcode: 'RGBLightsINIT',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.RGBLightsINIT',
                        default: '三色灯初始化 蓝灯(B)[RGBBPIN] 绿灯(G)[RGBGPIN] 红灯(R)[RGBRPIN]'
                    }),
                    blockType: BlockType.COMMAND,
                    
                    arguments: {
                        RGBRPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '13'
                        },
                        RGBGPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: 'A3'
                        },
                        RGBBPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: 'A2'
                        }
                    }
                },
                {
                    opcode: 'RGBLights',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.RGBLights',
                        default: '三色灯 蓝灯(B)[RGBBState] 绿灯(G)[RGBGState] 红灯(R)[RGBRState]'
                    }),
                    blockType: BlockType.COMMAND,
                    
                    arguments: {
                        RGBRState: {
                            type: ArgumentType.STRING,
                            menu: 'trLightsState',
                            defaultValue: 'LOW'
                        },
                        RGBGState: {
                            type: ArgumentType.STRING,
                            menu: 'trLightsState',
                            defaultValue: 'LOW'
                        },
                        RGBBState: {
                            type: ArgumentType.STRING,
                            menu: 'trLightsState',
                            defaultValue: 'LOW'
                        }
                    }
                },
                {                    opcode: 'SteppingMotorINIT',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.SteppingMotorINIT',
                        default: '[StMotorNum] 初始化 引脚1[IN1] 引脚2[IN2] 引脚3[IN3] 引脚4[IN4] 每转步数[Steps] 转速[SpeedVal]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        StMotorNum: {
                            type: ArgumentType.STRING,
                            menu: 'MteppingMotorNUM',
                            defaultValue: 'Stepper1'
                        },
                        IN1: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '7'
                        },
                        IN2: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '6'
                        },
                        IN3: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '5'
                        },
                        IN4: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '4'
                        },
                        Steps: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2048
                        },
                        SpeedVal: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'SteppingMotorRUN',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.SteppingMotorRUN',
                        default: '[StMotorNum] 移动步数[Steps2]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        StMotorNum: {
                            type: ArgumentType.STRING,
                            menu: 'MteppingMotorNUM',
                            defaultValue: 'Stepper1'
                        },
                        Steps2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2048
                        }
                    }
                },
                {
                    opcode: 'DCMotorRUN',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.DCMotorRUN',
                        default: '直流电机[DCMotorNum] 设置方向引脚[DPIN] 速度引脚[PPIN] 运动方向[RoDir] 速度[RunSpeed]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        DCMotorNum: {
                            type: ArgumentType.STRING,
                            menu: 'DCMotorNUM',
                            defaultValue: 'DCMotor1'
                        },
                        DPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '4'
                        },
                        PPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_AnalogWrite',
                            defaultValue: '5'
                        },
                        RoDir: {
                            type: ArgumentType.STRING,
                            menu: 'DCRunDir',
                            defaultValue: 'HIGH'
                        },
                        RunSpeed: {
                            type: ArgumentType.SLIDER,
                            inputParams: {
                                rangeMax: 255,
                                rangeMin: 0
                            },
                            defaultValue: 200,
                            inputTypes: [...DataType.NUMBER]
                        }
                    }
                },
                {
                    opcode: 'KEYBOARDROWINIT',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.KEYBOARDROWINIT',
                        default: '初始化3X4矩阵键盘 行1[ROWPIN1] 行2[ROWPIN2] 行3[ROWPIN3] 行4[ROWPIN4]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ROWPIN1: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalRead',
                            defaultValue: '13'
                        },
                        ROWPIN2: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalRead',
                            defaultValue: '12'
                        },
                        ROWPIN3: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalRead',
                            defaultValue: '11'
                        },
                        ROWPIN4: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalRead',
                            defaultValue: '10'
                        }
                    }
                },
                {
                    opcode: 'KEYBOARDCOLINIT',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.KEYBOARDCOLINIT',
                        default: '初始化3X4矩阵键盘 列1[COLPIN1] 列2[COLPIN2] 列3[COLPIN3]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COLPIN1: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalRead',
                            defaultValue: '9'
                        },
                        COLPIN2: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalRead',
                            defaultValue: '8'
                        },
                        COLPIN3: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalRead',
                            defaultValue: '3'
                        }
                    }
                },
                {
                    opcode: 'GETKEYVAL',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.GETKEYVAL',
                        default: '获取3X4矩阵键盘值'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'GD3800MP3BEGIN',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.GD3800MP3BEGIN',
                        default: 'MP3模块初始化 TX[MP3TXPIN] RX[MP3RXPIN]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MP3TXPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '12'
                        },
                        MP3RXPIN: {
                            type: ArgumentType.STRING,
                            menu: 'PIN_DigitalWrite',
                            defaultValue: '11'
                        }
                    }
                },
                {
                    opcode: 'GD3800MP3STATE',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.GD3800MP3STATE',
                        default: 'MP3模块 设置为[MP3STATE]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MP3STATE: {
                            type: ArgumentType.STRING,
                            menu: 'GD3800STATENAME',
                            defaultValue: 'play'
                        }
                    }
                },
                {
                    opcode: 'GD3800MP3PLAY',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.GD3800MP3PLAY',
                        default: 'MP3模块 播放第[MP3NUMBER]首'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MP3NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'GD3800MP3SETVOLUME',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.GD3800MP3SETVOLUME',
                        default: 'MP3模块 音量 设置为[MP3VOLUME]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MP3VOLUME: {
                            type: ArgumentType.SLIDER,
                            inputParams: {
                                rangeMax: 30,
                                rangeMin: 0
                            },
                            defaultValue: 20,
                            inputTypes: [...DataType.NUMBER]
                        }
                    }
                },
                {
                    opcode: 'GD3800MP3CYCLEMODE',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.GD3800MP3CYCLEMODE',
                        default: 'MP3模块 设置循环模式[CYCLEMODE]'
                    }),
                    blockType: BlockType.COMMAND,
                    
                    arguments: {
                        CYCLEMODE: {
                            type: ArgumentType.STRING,
                            menu: 'GD3800CYCLEMODE',
                            defaultValue: 'MP3_LOOP_ALL'
                        }
                    }
                },
                {
                    opcode: 'GD3800MP3EQUALIZER',
                    text: formatMessage({
                        id: 'gui.blocklyText.lzboardkit.GD3800MP3EQUALIZER',
                        default: 'MP3模块 设置均衡器[EQUALIZER]'
                    }),
                    blockType: BlockType.COMMAND,
                    
                    arguments: {
                        EQUALIZER: {
                            type: ArgumentType.STRING,
                            menu: 'GD3800EQUALIZER',
                            defaultValue: 'MP3_EQ_NORMAL'
                        }
                    }
                }
            ],
            menus: {
                PIN_DigitalWrite: [
                    { text: '2', value: '2' },
                    { text: '0(RX)', value: '0' },
                    { text: '1(TX)', value: '1' },
                    
                    { text: '3', value: '3' },
                    { text: '4', value: '4' },
                    { text: '5', value: '5' },
                    { text: '6', value: '6' },
                    { text: '7', value: '7' },
                    { text: '8', value: '8' },
                    { text: '9', value: '9' },
                    { text: '10', value: '10' },
                    { text: '11', value: '11' },
                    { text: '12', value: '12' },
                    { text: '13', value: '13' },
                    { text: 'A0', value: 'A0' },
                    { text: 'A1', value: 'A1' },
                    { text: 'A2', value: 'A2' },
                    { text: 'A3', value: 'A3' },
                    { text: 'A4', value: 'A4' },
                    { text: 'A5', value: 'A5' }
                ],
                PIN_DigitalRead: [
                    { text: '2', value: '2' },
                    { text: '3', value: '3' },
                    { text: '4', value: '4' },
                    { text: '5', value: '5' },
                    { text: '6', value: '6' },
                    { text: '7', value: '7' },
                    { text: '8', value: '8' },
                    { text: '9', value: '9' },
                    { text: '10', value: '10' },
                    { text: '11', value: '11' },
                    { text: '12', value: '12' },
                    { text: '13', value: '13' },
                    { text: 'A0', value: 'A0' },
                    { text: 'A1', value: 'A1' },
                    { text: 'A2', value: 'A2' },
                    { text: 'A3', value: 'A3' },
                    { text: 'A4', value: 'A4' },
                    { text: 'A5', value: 'A5' }
                ],
                PIN_AnalogRead: [
                    { text: 'A0', value: 'A0' },
                    { text: 'A1', value: 'A1' },
                    { text: 'A2', value: 'A2' },
                    { text: 'A3', value: 'A3' },
                    { text: 'A4', value: 'A4' },
                    { text: 'A5', value: 'A5' },
                    { text: 'A6', value: 'A6' },
                    { text: 'A7', value: 'A7' }
                ],
                PIN_AnalogWrite: [
                    { text: '3', value: '3' },
                    { text: '5', value: '5' },
                    { text: '6', value: '6' },
                    { text: '9', value: '9' },
                    { text: '10', value: '10' },
                    { text: '11', value: '11' }
                ],
                PIN_ISR: [
                    { text: '2', value: '2' },
                    { text: '3', value: '3' }
                ],
                MODULESTATEVAL: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.MODULESTATEVAL.HIGH', default: '打开' }), value: 'HIGH' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.MODULESTATEVAL.LOW', default: '关闭' }), value: 'LOW' }
                ],
                SBUTTONNUMBER: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.SBUTTONNUMBER.1', default: '红色按键' }), value: '1' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.SBUTTONNUMBER.2', default: '绿色按键' }), value: '2' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.SBUTTONNUMBER.3', default: '蓝色按键' }), value: '3' }
                ],
                DINMODULETYPEVAL: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.DINMODULETYPEVAL.USHSENSRO', default: 'U型光电传感器' }), value: 'USHSENSRO' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.DINMODULETYPEVAL.AVOO', default: '避障传感器' }), value: 'AVOO' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.DINMODULETYPEVAL.HMAMINFS', default: '人体红外传感器' }), value: 'HMAMINFS' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.DINMODULETYPEVAL.Collision', default: '碰撞开关' }), value: 'Collision' }
                ],
                TLColour: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.TLColour.HIGH', default: '白线' }), value: 'HIGH' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.TLColour.LOW', default: '黑线' }), value: 'LOW' }
                ],
                TTDIR: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.TTDIR.ttcklpin', default: '左寻迹' }), value: 'ttcklpin' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.TTDIR.ttckmpin', default: '中间寻迹' }), value: 'ttckmpin' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.TTDIR.ttckrpin', default: '右寻迹' }), value: 'ttckrpin' }
                ],
                VoicePlayerList: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x00', default: '老师' }), value: '0x00' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x01', default: '爸爸' }), value: '0x01' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x02', default: '妈妈' }), value: '0x02' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x03', default: '爷爷' }), value: '0x03' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x04', default: '奶奶' }), value: '0x04' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x05', default: '姥姥' }), value: '0x05' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x06', default: '姥爷' }), value: '0x06' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x07', default: '哥哥' }), value: '0x07' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x08', default: '姐姐' }), value: '0x08' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x09', default: '叔叔' }), value: '0x09' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x0A', default: '阿姨' }), value: '0x0A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x0B', default: '上午' }), value: '0x0B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x0C', default: '下午' }), value: '0x0C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x0D', default: '晚上' }), value: '0x0D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x0E', default: '前方' }), value: '0x0E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x0F', default: '厘米' }), value: '0x0F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x10', default: '新年快乐' }), value: '0x10' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x11', default: '身体健康' }), value: '0x11' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x12', default: '工作顺利' }), value: '0x12' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x13', default: '学习进步' }), value: '0x13' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x14', default: '您好' }), value: '0x14' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x15', default: '谢谢' }), value: '0x15' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x16', default: '的' }), value: '0x16' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x17', default: '祝' }), value: '0x17' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x18', default: '慢走' }), value: '0x18' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x19', default: '欢迎光临' }), value: '0x19' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x1A', default: '亲爱的' }), value: '0x1A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x1B', default: '同学们' }), value: '0x1B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x1C', default: '工作辛苦了' }), value: '0x1C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x1D', default: '点' }), value: '0x1D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x1E', default: '打开' }), value: '0x1E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x1F', default: '关闭' }), value: '0x1F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x20', default: '千' }), value: '0x20' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x21', default: '百' }), value: '0x21' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x22', default: '十/时' }), value: '0x22' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x23', default: '1' }), value: '0x23' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x24', default: '2' }), value: '0x24' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x25', default: '3' }), value: '0x25' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x26', default: '4' }), value: '0x26' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x27', default: '5' }), value: '0x27' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x28', default: '6' }), value: '0x28' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x29', default: '7' }), value: '0x29' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x2A', default: '8' }), value: '0x2A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x2B', default: '9' }), value: '0x2B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x2C', default: '0' }), value: '0x2C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x2D', default: '当前' }), value: '0x2D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x2E', default: '转' }), value: '0x2E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x2F', default: '左' }), value: '0x2F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x30', default: '右' }), value: '0x30' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x31', default: '请' }), value: '0x31' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x32', default: '已' }), value: '0x32' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x33', default: '现在' }), value: '0x33' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x34', default: '红灯' }), value: '0x34' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x35', default: '绿灯' }), value: '0x35' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x36', default: '是' }), value: '0x36' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x37', default: '黄灯' }), value: '0x37' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x38', default: '温度' }), value: '0x38' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x39', default: '湿度' }), value: '0x39' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x3A', default: '欢迎常来' }), value: '0x3A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x3B', default: '秒' }), value: '0x3B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x3C', default: '分' }), value: '0x3C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x3D', default: '变' }), value: '0x3D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x3E', default: '等' }), value: '0x3E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x3F', default: '下一次' }), value: '0x3F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x40', default: '功能' }), value: '0x40' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x41', default: '障碍物' }), value: '0x41' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x42', default: '世界那么大，我想去看看' }), value: '0x42' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x43', default: '今天' }), value: '0x43' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x44', default: '年' }), value: '0x44' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x45', default: '月' }), value: '0x45' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x46', default: '日' }), value: '0x46' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x47', default: '星期' }), value: '0x47' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x48', default: '农历' }), value: '0x48' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x49', default: '现在时刻' }), value: '0x49' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x4A', default: '北京时间' }), value: '0x4A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x4B', default: '整' }), value: '0x4B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x4C', default: '度' }), value: '0x4C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x4D', default: '百分之' }), value: '0x4D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x4E', default: '距离' }), value: '0x4E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x4F', default: '厘米' }), value: '0x4F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x50', default: '明天' }), value: '0x50' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x51', default: '天气' }), value: '0x51' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x52', default: '白天' }), value: '0x52' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x53', default: '夜间' }), value: '0x53' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x54', default: '晴' }), value: '0x54' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x55', default: '多云' }), value: '0x55' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x56', default: '阴' }), value: '0x56' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x57', default: '雨' }), value: '0x57' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x58', default: '雷阵' }), value: '0x58' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x59', default: '大' }), value: '0x59' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x5A', default: '小' }), value: '0x5A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x5B', default: '中' }), value: '0x5B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x5C', default: '夹' }), value: '0x5C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x5D', default: '雪' }), value: '0x5D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x5E', default: '雾' }), value: '0x5E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x5F', default: '霾' }), value: '0x5F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x60', default: '风' }), value: '0x60' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x61', default: '东' }), value: '0x61' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x62', default: '南' }), value: '0x62' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x63', default: '西' }), value: '0x63' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x64', default: '北' }), value: '0x64' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x65', default: '到' }), value: '0x65' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x66', default: '级' }), value: '0x66' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x67', default: '偏' }), value: '0x67' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x68', default: '方向' }), value: '0x68' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x69', default: '空气质量' }), value: '0x69' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x6A', default: '优' }), value: '0x6A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x6B', default: '良' }), value: '0x6B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x6C', default: '轻度污染' }), value: '0x6C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x6D', default: '中度污染' }), value: '0x6D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x6E', default: '重度污染' }), value: '0x6E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x6F', default: '上' }), value: '0x6F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x70', default: '下' }), value: '0x70' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x71', default: '接近' }), value: '0x71' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x72', default: '远离' }), value: '0x72' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x73', default: '灯' }), value: '0x73' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x74', default: '风扇' }), value: '0x74' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x75', default: '红色' }), value: '0x75' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x76', default: '绿色' }), value: '0x76' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x77', default: '蓝色' }), value: '0x77' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x78', default: '黄色' }), value: '0x78' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x79', default: '白色' }), value: '0x79' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x7A', default: '叮音效' }), value: '0x7A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x7B', default: '滴滴滴' }), value: '0x7B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList.0x7C', default: '叮叮音效' }), value: '0x7C' }
                ],
                VoicePlayerFun: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xE0', default: '设置音量0' }), value: '0xE0' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xE1', default: '设置音量1' }), value: '0xE1' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xE2', default: '设置音量2' }), value: '0xE2' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xE3', default: '设置音量3' }), value: '0xE3' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xE4', default: '设置音量4' }), value: '0xE4' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xE5', default: '设置音量5' }), value: '0xE5' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xE6', default: '设置音量6' }), value: '0xE6' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xE7', default: '设置音量7' }), value: '0xE7' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xF1', default: '连码-头' }), value: '0xF1' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xF2', default: '循环播放' }), value: '0xF2' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerFun.0xFE', default: '停止播放' }), value: '0xFE' }
                ],
                VoicePlayerList2: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x00', default: '老师' }), value: '0x00' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x01', default: '爸爸' }), value: '0x01' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x02', default: '妈妈' }), value: '0x02' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x03', default: '爷爷' }), value: '0x03' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x04', default: '奶奶' }), value: '0x04' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x05', default: '姥姥' }), value: '0x05' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x06', default: '姥爷' }), value: '0x06' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x07', default: '哥哥' }), value: '0x07' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x08', default: '姐姐' }), value: '0x08' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x09', default: '叔叔' }), value: '0x09' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x0A', default: '阿姨' }), value: '0x0A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x0B', default: '上午' }), value: '0x0B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x0C', default: '下午' }), value: '0x0C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x0D', default: '晚上' }), value: '0x0D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x0E', default: '前方' }), value: '0x0E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x0F', default: '厘米' }), value: '0x0F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x10', default: '新年快乐' }), value: '0x10' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x11', default: '身体健康' }), value: '0x11' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x12', default: '工作顺利' }), value: '0x12' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x13', default: '学习进步' }), value: '0x13' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x14', default: '您好' }), value: '0x14' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x15', default: '谢谢' }), value: '0x15' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x16', default: '的' }), value: '0x16' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x17', default: '祝' }), value: '0x17' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x18', default: '慢走' }), value: '0x18' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x19', default: '欢迎光临' }), value: '0x19' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x1A', default: '亲爱的' }), value: '0x1A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x1B', default: '同学们' }), value: '0x1B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x1C', default: '工作辛苦了' }), value: '0x1C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x1D', default: '点' }), value: '0x1D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x1E', default: '打开' }), value: '0x1E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x1F', default: '关闭' }), value: '0x1F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x20', default: '千' }), value: '0x20' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x21', default: '百' }), value: '0x21' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x22', default: '十/时' }), value: '0x22' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x23', default: '1' }), value: '0x23' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x24', default: '2' }), value: '0x24' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x25', default: '3' }), value: '0x25' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x26', default: '4' }), value: '0x26' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x27', default: '5' }), value: '0x27' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x28', default: '6' }), value: '0x28' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x29', default: '7' }), value: '0x29' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x2A', default: '8' }), value: '0x2A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x2B', default: '9' }), value: '0x2B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x2C', default: '0' }), value: '0x2C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x2D', default: '当前' }), value: '0x2D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x2E', default: '转' }), value: '0x2E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x2F', default: '左' }), value: '0x2F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x30', default: '右' }), value: '0x30' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x31', default: '请' }), value: '0x31' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x32', default: '已' }), value: '0x32' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x33', default: '现在' }), value: '0x33' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x34', default: '红灯' }), value: '0x34' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x35', default: '绿灯' }), value: '0x35' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x36', default: '是' }), value: '0x36' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x37', default: '黄灯' }), value: '0x37' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x38', default: '温度' }), value: '0x38' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x39', default: '湿度' }), value: '0x39' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x3A', default: '欢迎常来' }), value: '0x3A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x3B', default: '秒' }), value: '0x3B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x3C', default: '分' }), value: '0x3C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x3D', default: '变' }), value: '0x3D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x3E', default: '等' }), value: '0x3E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x3F', default: '下一次' }), value: '0x3F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x40', default: '功能' }), value: '0x40' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x41', default: '障碍物' }), value: '0x41' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x42', default: '世界那么大，我想去看看' }), value: '0x42' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x43', default: '今天' }), value: '0x43' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x44', default: '年' }), value: '0x44' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x45', default: '月' }), value: '0x45' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x46', default: '日' }), value: '0x46' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x47', default: '星期' }), value: '0x47' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x48', default: '农历' }), value: '0x48' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x49', default: '现在时刻' }), value: '0x49' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x4A', default: '北京时间' }), value: '0x4A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x4B', default: '整' }), value: '0x4B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x4C', default: '度' }), value: '0x4C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x4D', default: '百分之' }), value: '0x4D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x4E', default: '距离' }), value: '0x4E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x4F', default: '厘米' }), value: '0x4F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x50', default: '明天' }), value: '0x50' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x51', default: '天气' }), value: '0x51' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x52', default: '白天' }), value: '0x52' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x53', default: '夜间' }), value: '0x53' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x54', default: '晴' }), value: '0x54' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x55', default: '多云' }), value: '0x55' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x56', default: '阴' }), value: '0x56' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x57', default: '雨' }), value: '0x57' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x58', default: '雷阵' }), value: '0x58' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x59', default: '大' }), value: '0x59' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x5A', default: '小' }), value: '0x5A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x5B', default: '中' }), value: '0x5B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x5C', default: '夹' }), value: '0x5C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x5D', default: '雪' }), value: '0x5D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x5E', default: '雾' }), value: '0x5E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x5F', default: '霾' }), value: '0x5F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x60', default: '风' }), value: '0x60' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x61', default: '东' }), value: '0x61' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x62', default: '南' }), value: '0x62' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x63', default: '西' }), value: '0x63' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x64', default: '北' }), value: '0x64' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x65', default: '到' }), value: '0x65' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x66', default: '级' }), value: '0x66' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x67', default: '偏' }), value: '0x67' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x68', default: '方向' }), value: '0x68' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x69', default: '空气质量' }), value: '0x69' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x6A', default: '优' }), value: '0x6A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x6B', default: '良' }), value: '0x6B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x6C', default: '轻度污染' }), value: '0x6C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x6D', default: '中度污染' }), value: '0x6D' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x6E', default: '重度污染' }), value: '0x6E' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x6F', default: '上' }), value: '0x6F' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x70', default: '下' }), value: '0x70' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x71', default: '接近' }), value: '0x71' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x72', default: '远离' }), value: '0x72' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x73', default: '灯' }), value: '0x73' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x74', default: '风扇' }), value: '0x74' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x75', default: '红色' }), value: '0x75' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x76', default: '绿色' }), value: '0x76' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x77', default: '蓝色' }), value: '0x77' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x78', default: '黄色' }), value: '0x78' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x79', default: '白色' }), value: '0x79' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x7A', default: '叮音效' }), value: '0x7A' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x7B', default: '滴滴滴' }), value: '0x7B' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0x7C', default: '叮叮音效' }), value: '0x7C' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0xF3', default: '连码-尾' }), value: '0xF3' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.VoicePlayerList2.0xF4', default: '连码-静音' }), value: '0xF4' }
                ],
                trLightsState: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.trLightsState.LOW', default: '关' }), value: 'LOW' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.trLightsState.HIGH', default: '开' }), value: 'HIGH' }
                ],
                MteppingMotorNUM: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.MteppingMotorNUM.Stepper1', default: '步进电机1' }), value: 'Stepper1' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.MteppingMotorNUM.Stepper2', default: '步进电机2' }), value: 'Stepper2' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.MteppingMotorNUM.Stepper3', default: '步进电机3' }), value: 'Stepper3' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.MteppingMotorNUM.Stepper4', default: '步进电机4' }), value: 'Stepper4' }
                ],
                DCMotorNUM: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.DCMotorNUM.DCMotor1', default: 'M1' }), value: 'DCMotor1' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.DCMotorNUM.DCMotor2', default: 'M2' }), value: 'DCMotor2' }
                ],
                DCRunDir: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.DCRunDir.HIGH', default: '前进' }), value: 'HIGH' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.DCRunDir.LOW', default: '后退' }), value: 'LOW' }
                ],
                GD3800STATENAME: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800STATENAME.play', default: '播放' }), value: 'play' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800STATENAME.pause', default: '暂停' }), value: 'pause' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800STATENAME.next', default: '下一曲' }), value: 'next' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800STATENAME.prev', default: '上一曲' }), value: 'prev' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800STATENAME.volumeUp', default: '音量加' }), value: 'volumeUp' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800STATENAME.volumeDn', default: '音量减' }), value: 'volumeDn' }
                ],
                GD3800CYCLEMODE: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800CYCLEMODE.MP3_LOOP_ALL', default: '全部循环' }), value: 'MP3_LOOP_ALL' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800CYCLEMODE.MP3_LOOP_FOLDER', default: '文件夹循环' }), value: 'MP3_LOOP_FOLDER' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800CYCLEMODE.MP3_LOOP_ONE', default: '单曲循环' }), value: 'MP3_LOOP_ONE' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800CYCLEMODE.MP3_LOOP_RAM', default: '随机循环' }), value: 'MP3_LOOP_RAM' }
                ],
                GD3800EQUALIZER: [
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800EQUALIZER.MP3_EQ_NORMAL', default: '正常' }), value: 'MP3_EQ_NORMAL' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800EQUALIZER.MP3_EQ_POP', default: '流行' }), value: 'MP3_EQ_POP' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800EQUALIZER.MP3_EQ_ROCK', default: '摇滚' }), value: 'MP3_EQ_ROCK' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800EQUALIZER.MP3_EQ_JAZZ', default: '爵士' }), value: 'MP3_EQ_JAZZ' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800EQUALIZER.MP3_EQ_CLASSIC', default: '古典' }), value: 'MP3_EQ_CLASSIC' },
                    { text: formatMessage({ id: 'gui.blocklyText.lzboardkit.menu.GD3800EQUALIZER.MP3_EQ_BASS', default: '低音' }), value: 'MP3_EQ_BASS' }
                ]
            }
        };
    }
}


export default LZBoardKit;