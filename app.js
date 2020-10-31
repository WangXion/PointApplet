App({
    onLaunch: function() {
        // setInterval(function() {
        //     console.log('doSomething')
        //     setInterval(function() {
        //         console.log('doSomething')
        //      }, 1);
        //  }, 100000000000000);
        var n = this, s = wx.getStorageSync("logs") || [];
        s.unshift(Date.now()), wx.setStorageSync("logs", s), wx.login({
            success: function(n) {}
        }), wx.getSetting({
            success: function(s) {
                s.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(s) {
                        n.globalData.userInfo = s.userInfo, n.userInfoReadyCallback && n.userInfoReadyCallback(s);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null
    }

});