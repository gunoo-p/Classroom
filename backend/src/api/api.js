// api/api.js
import express from 'express';
import pool, { testConnection } from '../db/connect.js';

const router = express.Router();

// 공통 쿼리 헬퍼 함수. 많이 쓰이는 함수를 공통으로 분리
async function query(sql, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } finally {
    client.release();
  }
}

/**
 * 1) 산업통상부_소재부품장비 생산통계 지역별 산업현황
 *    테이블: mpe_production_stats_by_region
 *    최종 URL: GET /chart/production?limit=100
 */
router.get('/production', async (req, res) => {
  try {
    const { limit = 100 } = req.query;

    const sql = `
      SELECT
        region,
        mpe_category_name,
        mpe_code,
        num_establishments,
        num_employees,
        value_added_million_krw,
        production_amount_million_krw,
        shipment_amount_million_krw,
        inventory_amount_million_krw
      FROM mpe_production_stats_by_region
      ORDER BY region, mpe_category_name, mpe_code
      LIMIT $1
    `;

    const rows = await query(sql, [Number(limit)]);

    return res.status(200).json({
      ok: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error('GET /chart/production error:', err);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
});

/**
 * 2) 소재부품장비 핵심전략기술 목록
 *    테이블: mpe_core_strategic_technologies
 *    최종 URL: GET /chart/core-tech?limit=100
 */
router.get('/core-tech', async (req, res) => {
  try {
    const { limit = 100 } = req.query;

    const sql = `
      SELECT
        field,
        target_technology,
        technology_description,
        related_laws
      FROM mpe_core_strategic_technologies
      ORDER BY field, target_technology
      LIMIT $1
    `;

    const rows = await query(sql, [Number(limit)]);

    return res.status(200).json({
      ok: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error('GET /chart/core-tech error:', err);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
});

/**
 * 3) 충청북도 반도체기업 현황
 *    테이블: chungbuk_semiconductor_companies
 *    최종 URL: GET /chart/companies?limit=100
 */
router.get('/companies', async (req, res) => {
  try {
    const { limit = 100 } = req.query;

    const sql = `
      SELECT
        company_name,
        hq_address,
        plant_address,
        main_product_name,
        company_category,
        industry_name
      FROM chungbuk_semiconductor_companies
      ORDER BY company_name
      LIMIT $1
    `;

    const rows = await query(sql, [Number(limit)]);

    return res.status(200).json({
      ok: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error('GET /chart/companies error:', err);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
});

/**
 * 4) 반도체·디스플레이 수출 트렌드
 *    테이블: public.export_semiconductor_display_trends
 *    최종 URL: GET /chart/exports?limit=120
 */
router.get('/exports', async (req, res) => {
  try {
    const { limit = 120 } = req.query;

    const sql = `
      SELECT
        year_month,
        semiconductor_100m_usd,
        semiconductor_yoy_change_pct,
        memory_100m_usd,
        memory_yoy_change_pct,
        memory_dram_100m_usd,
        memory_dram_yoy_change_pct,
        memory_nand_100m_usd,
        memory_nand_yoy_change_pct,
        memory_mcp_100m_usd,
        memory_mcp_yoy_change_pct,
        system_semiconductor_100m_usd,
        system_semiconductor_yoy_change_pct,
        discrete_devices_100m_usd,
        discrete_devices_yoy_change_pct,
        display_panel_100m_usd,
        display_panel_yoy_change_pct
      FROM public.export_semiconductor_display_trends
      ORDER BY year_month
      LIMIT $1
    `;

    const rows = await query(sql, [Number(limit)]);

    return res.status(200).json({
      ok: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error('GET /chart/exports error:', err);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
});

/**
 * 헬스 체크 (DB 연결 확인용)
 * 최종 URL: GET /chart/health
 */
router.get('/health', async (req, res) => {
  try {
    const result = await testConnection();
    return res.status(result.success ? 200 : 500).json({
      ok: result.success,
      message: result.message,
    });
  } catch (err) {
    console.error('GET /chart/health error:', err);
    return res.status(500).json({
      ok: false,
      message: 'DB connection failed',
    });
  }
});

export default router;