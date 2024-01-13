'use client'
import * as React from 'react';
//デモ用スマホ画面追加
function mockupphone({children}) {
    return (
        <div style={{ margin: 0, padding: 0, height: '100%' }}>
            <div className="mockup-phone-container" style={{ overflow: 'auto'  }}> {/*overflow;autoでスクロールバー爆誕 */}
                    <div className="mockup-phone" style={{ position: 'relative',overflow: 'auto'}}> 
                        <div className="camera"></div> 
                            <div className="display">
                                <div className="artboard artboard-demo phone-1" style={{overflow: 'auto',justifyContent: 'flex-start'}}> {/*flex-startでスクロール上端からできた */}
                                    <div className="artboard phone-1" style={{backgroundColor: '#FFFFFF'}}>
                                    {children}
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
        </div> 
    );
}

export default mockupphone;
