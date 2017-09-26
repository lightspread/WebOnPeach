package routers


import (
	"../models"
	"../modules/middleware"
	"encoding/json"
)

func Samples(ctx *middleware.Context) {
	ctx.HTML(200, "samples")
}

func SamplesList(ctx *middleware.Context) {
	if samList,err := models.GetSampleLists();err==nil {
		data,_ :=json.Marshal(samList)
		ctx.Resp.Write([]byte(data))
	} else {
		ctx.HTML(404,"404")
	}
}