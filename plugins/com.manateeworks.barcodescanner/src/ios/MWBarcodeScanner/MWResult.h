//
//  MWResult.h
//  mobiscan_ALL
//
//  Created by vladimir zivkovic on 12/19/14.
//  Copyright (c) 2014 Manatee Works. All rights reserved.
//

//#import <Foundation/Foundation.h>

@interface MWLocation : NSObject{
    
    CGPoint _points[4];
    
}

@property (readwrite) CGPoint p1;
@property (readwrite) CGPoint p2;
@property (readwrite) CGPoint p3;
@property (readwrite) CGPoint p4;
@property (readonly) CGPoint *points;

-(id)initWithPoints: (float) x1 y1: (float) y1 x2: (float) x2 y2: (float) y2 x3: (float) x3 y3: (float) y3 x4: (float) x4 y4: (float) y4;

@end

@interface MWResult : NSMutableDictionary

@property (nonatomic, retain) NSString *text;
@property (readwrite) uint8_t *bytes;
@property (readwrite) int bytesLength;
@property (readwrite) int type;
@property (nonatomic, retain) NSString *typeName;
@property (readwrite) int subtype;
@property (readwrite) int imageWidth;
@property (readwrite) int imageHeight;
@property (readwrite) bool isGS1;
@property (nonatomic, retain) MWLocation *locationPoints;


@end



@interface MWResults : NSObject


@property (readwrite) int version;
@property (nonatomic, retain) NSMutableArray *results;
@property (readwrite) int count;


-(id)initWithBuffer:(uint8_t *)buffer;
- (MWResult *) resultAtIntex: (int) index;

@end




