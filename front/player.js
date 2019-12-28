function onVideoChange()
{
    var file = document.getElementById('srcVideo').files[0];
    var url = URL.createObjectURL(file);
    document.getElementById("video").src = url;
}

function onTextChange()
{
    var file = document.getElementById('srcText').files[0];

    var reader = new FileReader();
    reader.onload = onLoadTips;
    reader.readAsText(file);
}

function onPlay()
{
    player = document.getElementById('player');

    if (screenfull.isEnabled)
    {
        screenfull.request(player);
    }

    oldTipContent=''
    video = document.getElementById('video');
    video.play()
}

function onPause()
{
    video = document.getElementById('video');
    video.pause()
}

function onLoadTips(e)
{
    content=e.target.result
    
    parts=content.split('\n\n')

    tips=new Array()
    for (i in parts)
    {
        item=parts[i]
        lines=item.split('\n')
        time=lines[1]
        text=lines.slice(2)

        start=parseInt(time.slice(0,2))*60*60 + parseInt(time.slice(3,5))*60 + parseInt(time.slice(6,8)) + parseInt(time.slice(9,12))/1000.0+15
        //end=parseInt(time.slice(17,19))*60*60 + parseInt(time.slice(20,22))*60 + parseInt(time.slice(23,25)) + parseInt(time.slice(26,29))/1000.0
        end=start+1

        tip=new Array(start,end,text.join("<br>"))
        tips.push(tip)         
    }
}

function getTip(currentTime)
{
    for (i in tips)
    {
        item=tips[i]
        
        if (currentTime>item[0] && currentTime<item[1])
        {
            return item[2]
        }
    }
    return ""
}


function onTimeUpdate()
{
    video = document.getElementById('video');
    tipContent=getTip(video.currentTime)

    if (oldTipContent!=tipContent && tipContent!='')
    {
        video.pause()
        setTimeout("video.play()",10000)
    }

    oldTipContent=tipContent

    tip = document.getElementById('tip')
    tip.innerHTML=tipContent
}
