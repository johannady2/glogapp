/*
 * Copyright (C) 2012  Manatee Works, Inc.
 *
 */

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import <CoreVideo/CoreVideo.h>
#import <CoreMedia/CoreMedia.h>

#define OM_MW       1
#define OM_IMAGE    2

@protocol ScanningFinishedDelegate <NSObject>
    - (void)scanningFinished:(NSString *)result withType: (NSString *) lastFormat isGS1: (bool) isGS1 andRawResult: (NSData *) rawResult;
@end


@class MWResult;

@interface DecoderResult : NSObject {
    BOOL succeeded;
    MWResult *mwResult;
}

@property (nonatomic, assign) BOOL succeeded;
@property (nonatomic, retain) MWResult *result;

+(DecoderResult *)createSuccess:(MWResult *)result;
+(DecoderResult *)createFailure;

@end



typedef enum eMainScreenState {
	NORMAL,
	LAUNCHING_CAMERA,
	CAMERA,
	CAMERA_DECODING,
	DECODE_DISPLAY,
	CANCELLING
} MainScreenState;


@interface MWScannerViewController : UIViewController<AVCaptureVideoDataOutputSampleBufferDelegate,UINavigationControllerDelegate, UIAlertViewDelegate>{
    
    IBOutlet UIImageView *cameraOverlay;
    IBOutlet UIButton *closeButton;
    IBOutlet UIButton *flashButton;
    IBOutlet UIButton *zoomButton;
    
    float firstZoom;
    float secondZoom;
    BOOL videoZoomSupported;
    
}



@property (nonatomic, assign) MainScreenState state;
@property (nonatomic, retain) AVCaptureSession *captureSession;
@property (nonatomic, retain) AVCaptureVideoPreviewLayer *prevLayer;
@property (nonatomic, retain) AVCaptureDevice *device;
@property (nonatomic, retain) NSTimer *focusTimer;
@property (nonatomic, retain) id <ScanningFinishedDelegate> delegate;
@property (nonatomic, retain) UIButton *flashButton;
@property (nonatomic, retain) UIButton *zoomButton;
@property (nonatomic, retain) NSMutableDictionary *customParams;


- (IBAction)doClose:(id)sender;
+ (void) initDecoder;
+ (void) setInterfaceOrientation: (UIInterfaceOrientationMask) interfaceOrientation;
+ (void) enableHiRes: (BOOL) hiRes;
+ (void) enableFlash: (BOOL) flash;
+ (void) turnFlashOn: (BOOL) flashOn;
+ (void) setOverlayMode: (int) overlayMode;
+ (void) enableZoom: (BOOL) zoom;
+ (void) setMaxThreads: (int) maxThreads;
+ (void) setZoomLevels: (int) zoomLevel1 zoomLevel2: (int) zoomLevel2 initialZoomLevel: (int) initialZoomLevel;

- (void)revertToNormal;
- (void)decodeResultNotification: (NSNotification *)notification;
- (void)initCapture;
- (void) startScanning;
- (void) stopScanning;
- (void) toggleTorch;


@end