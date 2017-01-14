import { Injectable } from '@angular/core';
import { ChartOptionsService } from './chart-options.service';
declare let fc:any;
declare let d3:any;
@Injectable()
export class ChartTooltipsService {
  constructor(private chartOptionsService:ChartOptionsService) {
  }

  getLastClose():any {
    return fc.annotation.line()
      .value((d:any) => {
        return d.close;
      })
      .label((d:any) => {
        return this.chartOptionsService.options.priceFormat(d.close);
      })
      .decorate((sel:any) => {
        this.addYTooltip(sel);
        sel.enter().classed('close', true);
      });
  }

  addYTooltip(sel:any) {
    sel.enter()
      .select('.right-handle')
      .classed('callout', true)
      .insert('path', ':first-child')
      .attr('transform', 'translate(' + this.chartOptionsService.options.calloutLeftMargin + ', 0)')
      .attr('d', d3.svg.area()(this.chartOptionsService.options.calloutPathData));

    sel.select('text')
      .attr('transform',
        'translate(' + this.chartOptionsService.options.yAxisWidth + ', '
        + (this.chartOptionsService.options.calloutHeight / 4) + ')')
      .attr('x', 0)
      .attr('y', 0);
  }

  addXTooltip(sel:any) {
    sel.enter()
      .select('.top-handle')
      .select('text')
      .remove();

    let container:any = sel.enter()
      .select('.bottom-handle');

    container.classed('callout', true)
      .append('rect')
      .attr('transform', 'translate(-40, 0)')
      .attr('width', 80)
      .attr('height', this.chartOptionsService.options.xAxisHeight);

    container.append('text')
      .attr('y', this.chartOptionsService.options.xAxisHeight / 2)
      .text((d:any) => {
        return this.chartOptionsService.options.dateFormat(d.x);
      });

    container = null;
  }
}