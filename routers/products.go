package routers


import (
	"github.com/lightspread/WebOnPeach/models"
	"github.com/lightspread/WebOnPeach/modules/middleware"
	"encoding/json"
)

func Samples(ctx *middleware.Context) {
	ctx.HTML(200, "samples")
}

type repData struct {
	Total     int `json:"total"`
	Offset int `json:"offset"`
	Size   int `json:"size"`
	Datas  models.SampleItems `json:"datas"`
}

func SamplesList(ctx *middleware.Context) {
	localeName := ctx.Query("locale")
	offset := ctx.QueryInt("offset")
	pagesize := ctx.QueryInt("pagesize")
	locale := models.Locale_zh
	if localeName=="en-US" {
		locale = models.Locale_en
	}
	if samList,err := models.GetSampleLists(locale);err==nil {
		end := pagesize + offset
		if(len(samList)-offset < pagesize) {
			end = len(samList)
		}
		rdata := repData{ len(samList),offset,pagesize,samList[offset:end]}
		data,_ :=json.Marshal(rdata)
		ctx.Resp.Write([]byte(data))
	} else {
		ctx.HTML(404,"404")
	}
}

func Download(ctx *middleware.Context)  {
	ctx.HTML(200, "download")
}